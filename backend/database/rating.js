const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://masood:DLoMI60ksHyhb7GC@rapl.mz1pwz0.mongodb.net/?retryWrites=true&w=majority&appName=RAPL', { 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const users = require('../models/users')
const axios = require('axios')


const updateRating = async () => {
    const fetchedUsers = await users.find({})

    let apiURL = 'https://codeforces.com/api/user.info?handles='

    for (const user of fetchedUsers){
        const handle = user.cfHandle
       apiURL=apiURL+handle+';'
    }

    const response = await axios.get(apiURL)
    const userData = response.data.result

    for(const user of userData){
        
    }
}

module.exports = updateRating
