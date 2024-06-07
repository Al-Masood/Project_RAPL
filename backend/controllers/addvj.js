const vjContests = require('../models/vjcontests')

async function addVJContest(jsonString) {
    try {
        const contest = jsonString
        const cleanedData = {}
        const idToHandle = {}
        const participantData = {}
        const number = contest.id
        const duration = contest.length / 1000

        cleanedData["number"] = number
        cleanedData["data"] = []

        for (const [participantID, details] of Object.entries(contest.participants)) {
            idToHandle[participantID] = details[0]
            participantData[details[0]] = {}
        }

        for (const submission of contest.submissions) {
            const handle = idToHandle[submission[0]]
            const problemNumber = submission[1];
            const acceptStatus = submission[2];
            const submissionTime = submission[3];
            if (!participantData[handle][problemNumber]) {
                participantData[handle][problemNumber] = []
            }
            participantData[handle][problemNumber].push({
                acceptStatus,
                submissionTime
            })
        }

        for (const handle of Object.keys(participantData)) {
            let solved = 0
            let penalty = 0
            for (const problemNumber of Object.keys(participantData[handle])) {
                participantData[handle][problemNumber].sort((a, b) => a.submissionTime - b.submissionTime)
                let solvedStatus = false
                let pen = 0
                for (let i = 0; i < participantData[handle][problemNumber].length; i++) {
                    acceptStatus = participantData[handle][problemNumber][i].acceptStatus
                    submissionTime = participantData[handle][problemNumber][i].submissionTime
                    if (acceptStatus == 1 && submissionTime <= duration) {
                        solvedStatus = true
                        pen = i * 1200 + submissionTime
                    }
                }
                if (solvedStatus) {
                    solved++
                    penalty += pen
                }
            }
            penalty = Math.floor(penalty / 60)
            cleanedData["data"].push({
                handle,
                solved,
                penalty
            })
        }

        const vjContest = new vjContests(cleanedData)
        await vjContest.save()

    } catch(error){
        console.log('Error while adding VJudge contest', error)
    }
}

module.exports = addVJContest