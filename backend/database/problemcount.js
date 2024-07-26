const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://masood:DLoMI60ksHyhb7GC@rapl.mz1pwz0.mongodb.net/?retryWrites=true&w=majority&appName=RAPL', { 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const users = require('../models/users')
const axios = require('axios')
const cheerio = require('cheerio')

const updateProblemCount = async () => {
    const fetchedUsers = await users.find({})
    for(const user of fetchedUsers){
        const response = await axios.get(`https://codeforces.com/profile/${user.cfHandle}`)
        const html = response.data
        
        const $ = cheerio.load(html)

        let allTime = $('div._UserActivityFrame_counterValue').eq(0).text().trim()
        allTime = parseInt(allTime.match(/\d+/)[0], 10)

        let lastYear = $('div._UserActivityFrame_counterValue').eq(1).text().trim()
        lastYear = parseInt(lastYear.match(/\d+/)[0], 10)

        let lastMonth = $('div._UserActivityFrame_counterValue').eq(2).text().trim()
        lastMonth = parseInt(lastMonth.match(/\d+/)[0], 10)
        
        console.log(allTime, lastYear, lastMonth)

        await users.findByIdAndUpdate(user._id, {
            $set: {
                allTime,
                lastYear,
                lastMonth
            }
        });

    }
}

module.exports = updateProblemCount