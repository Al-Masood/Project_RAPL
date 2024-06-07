const vjContests = require('../models/vjcontests')

async function fetchVJRanklist(numbers) {
    const ranklist = {}
    const handles = []
    for (const number of numbers) {
        const contestData = await vjContests.findOne({number: number})
        for (const data of contestData.data) {
            if(!handles.includes(data.handle)){
                handles.push(data.handle)
            }
        }
    }

    for (const handle of handles){
        ranklist[handle]={}
        ranklist[handle][`Total Solved`] = 0
        ranklist[handle][`Total Penalty`] = 0
        for(const number of numbers){
            ranklist[handle][`Contest ${number} Solves`] = 0
            ranklist[handle][`Contest ${number} Penalty`] = 0
        }
    }

    for (const number of numbers) {
        const contestData = await vjContests.findOne({number: number})
        for (const data of contestData.data) {
            ranklist[data.handle][`Contest ${number} Solves`] = data.solved
            ranklist[data.handle][`Contest ${number} Penalty`] = data.penalty
            ranklist[data.handle][`Total Solved`] += data.solved
            ranklist[data.handle][`Total Penalty`] += data.penalty
        }
    }

    ranklistEntries = Object.entries(ranklist)

    ranklistEntries.sort((a, b) => {
        if(a[1][`Total Solved`] == b[1][`Total Solved`]){
            return a[1][`Total Penalty`] - b[1][`Total Penalty`]
        }
        return b[1][`Total Solved`] - a[1][`Total Solved`]
    })

    const finalRanklist = []

    const headers = ['Rank', 'Handle']

    for(const header of Object.keys(ranklistEntries[0][1])){
        headers.push(header)
    }

    finalRanklist.push(headers)

    let rank = 1
    for(const entry of ranklistEntries){
        const row = [rank++]
        row.push(entry[0])
        for(const data of Object.values(entry[1])){
            row.push(data)
        }
        finalRanklist.push(row)
    }
    return finalRanklist
}

module.exports = fetchVJRanklist
