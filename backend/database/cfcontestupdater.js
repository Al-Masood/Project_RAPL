const fs = require('fs');
const axios = require('axios');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const updateContest = async (contestId) => {
    try {
        const response = await axios.get(`https://codeforces.com/api/contest.ratingChanges?contestId=${contestId}`);
        const data = response.data;
        const response2 = await axios.get(`https://codeforces.com/api/contest.standings?contestId=${contestId}&from=1&count=1`);
        const data2 = response2.data;
        const name = data2.result.contest.name;
        const date = new Date(data2.result.contest.startTimeSeconds * 1000);
        const formattedDate = date.toISOString();

        const filePath = path.join(__dirname, `contest_${contestId}_standings.json`);

        let jsonContent = {};
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf8');
            jsonContent = JSON.parse(fileData);
        } else {
            jsonContent = {
                name: '',
                date: '',
                data: []
            };
        }

        jsonContent.name = name;
        jsonContent.date = formattedDate;

        data.result.forEach(details => {
            const userIndex = jsonContent.data.findIndex(user => user.handle === details.handle);
            if (userIndex !== -1) {
                jsonContent.data[userIndex].rank = details.rank;
                jsonContent.data[userIndex].oldRating = details.oldRating;
                jsonContent.data[userIndex].newRating = details.newRating;
            } else {
                jsonContent.data.push({
                    handle: details.handle,
                    rank: details.rank,
                    oldRating: details.oldRating,
                    newRating: details.newRating
                });
            }
        });

        fs.writeFileSync(filePath, JSON.stringify(jsonContent, null, 2), 'utf8');
        console.log(`JSON file '${filePath}' updated successfully`);
    } catch (error) {
        console.error('Error updating contest:', error);
    }
}

rl.question('Enter the contest number: ', (contestNumber) => {
    updateContest(contestNumber)
        .then(() => rl.close())
        .catch(err => {
            console.error('Unhandled error:', err);
            rl.close();
        });
});
