const vjContests = require('../models/vjcontests');

async function fetchVJRanklist(numbers) {
    const ranklist = {};
    const handles = new Set();
    
    for (const number of numbers) {
        const contestData = await vjContests.findOne({ number: number });
        for (const data of contestData.data) {
            handles.add(data.handle);
        }
    }

    for (const handle of handles) {
        ranklist[handle] = {
            'Total Solved': 0,
            'Total Penalty': 0
        };
        for (let tfc = 1; tfc <= numbers.length; tfc++) {
            ranklist[handle][`TFC ${tfc} Solve Count`] = 0;
            ranklist[handle][`TFC ${tfc} Penalty`] = 0;
        }
    }

    let tfc = 1;
    for (const number of numbers) {
        const contestData = await vjContests.findOne({ number: number });
        for (const data of contestData.data) {
            ranklist[data.handle][`TFC ${tfc} Solve Count`] = data.solved;
            ranklist[data.handle][`TFC ${tfc} Penalty`] = data.penalty;
            ranklist[data.handle]['Total Solved'] += data.solved;
            ranklist[data.handle]['Total Penalty'] += data.penalty;
        }
        tfc++;
    }

    const ranklistEntries = Object.entries(ranklist);

    ranklistEntries.sort((a, b) => {
        if (a[1]['Total Solved'] === b[1]['Total Solved']) {
            return a[1]['Total Penalty'] - b[1]['Total Penalty'];
        }
        return b[1]['Total Solved'] - a[1]['Total Solved'];
    });

    const finalRanklist = [];
    const headers = ['Rank', 'Handle'];

    for (const header of Object.keys(ranklistEntries[0][1])) {
        headers.push(header);
    }

    finalRanklist.push(headers);

    let rank = 1;
    for (const entry of ranklistEntries) {
        const row = [rank++];
        row.push(entry[0]);
        for (const data of Object.values(entry[1])) {
            row.push(data);
        }
        finalRanklist.push(row);
    }
    return finalRanklist;
}

module.exports = fetchVJRanklist;