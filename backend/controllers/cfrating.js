const users = require('../models/users')
const axios = require('axios')

async function cfRating (req, res){
    const type = req.body.type
    const fetchedUsers = await users.find({})
    
    ranklist = []
    for (const user of fetchedUsers){
        ranklist.push([user.cfHandle, user.rating, user.maxRating])
    }

    if(type === 'CurrentRating'){
        ranklist.sort((a, b) => {
            if(a[1] == b[1]){
                return b[2] - a[2]
            }
            return b[1] - a[1]
        })
    }

    else{
        ranklist.sort((a, b) => {
            if(a[2] == b[2]){
                return b[1] - a[1]
            }
            return b[2] - a[2]
        })
    }
    
    finalRanklist = []
    finalRanklist.push(['Handle', 'Current Rating', 'Max Rating'])
    for (const entries of ranklist) finalRanklist.push(entries)
    
    const jsonRanklist = JSON.stringify(finalRanklist)
    res.send(jsonRanklist)
}

module.exports = cfRating