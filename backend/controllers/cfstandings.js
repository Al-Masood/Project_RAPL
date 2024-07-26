const users = require('../models/users')
const cfContests = require('../models/cfcontests')

async function cfStandings(req, res) {
    const contestId = req.body.selectedContestId
    const fetchedUsers = await users.find({})
    
    const fetchedUserHandles = new Set(fetchedUsers.map(user => user.cfHandle))

    const userData = await cfContests.findOne({number: contestId})
    
    let ranklist = []

    for (const user of userData.data){
        if (fetchedUserHandles.has(user.handle)) {
            ranklist.push([user.rank, user.handle, user.performanceRating, user.oldRating, user.newRating])
        }
    }
    
    let finalRanklist = []
    finalRanklist.push(['Rank', 'Handle', 'Performance Rating', 'Old Rating', 'New Rating'])
    for (const entries of ranklist) {
        finalRanklist.push(entries)
    }
    
    const jsonRanklist = JSON.stringify(finalRanklist)
    res.send(jsonRanklist)
}

module.exports = cfStandings