const users = require('../models/users')

async function cfActivity(req, res) {
    try {
        const type = req.body.type
        const fetchedUsers = await users.find({})

        ranklist = []
        finalRanklist = []

        if (type == 'allTime') {
            for (const user of fetchedUsers) {
                ranklist.push([user.cfHandle, user.allTime])
            }
            ranklist.sort((a, b) => {
                return b[1] - a[1]
            })
            finalRanklist.push(['Handle', 'Solved for All Time'])
            for (const entries of ranklist) finalRanklist.push(entries)
        }

        if (type == 'lastYear') {
            for (const user of fetchedUsers) {
                ranklist.push([user.cfHandle, user.lastYear])
            }
            ranklist.sort((a, b) => {
                return b[1] - a[1]
            })
            finalRanklist.push(['Handle', 'Solved for Last Year'])
            for (const entries of ranklist) finalRanklist.push(entries)
        }

        if (type == 'lastMonth') {
            for (const user of fetchedUsers) {
                ranklist.push([user.cfHandle, user.lastMonth])
            }
            ranklist.sort((a, b) => {
                return b[1] - a[1]
            })
            finalRanklist.push(['Handle', 'Solved for Last Month'])
            for (const entries of ranklist) finalRanklist.push(entries)
        }

        const jsonRanklist = JSON.stringify(finalRanklist)
        res.status(200).send(jsonRanklist)
        
    } catch {
        res.status(400).send('Error while fetching CF Activity')
    }
}

module.exports = cfActivity