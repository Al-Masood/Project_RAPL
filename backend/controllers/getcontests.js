const cfContests = require('../models/cfcontests.js')

async function getContests(req, res) {
    const contests = await cfContests.find()
        .sort({ date: -1 })
        .limit(10)
        .select('name number')
        .exec();
    
    res.send(contests)
}

module.exports = getContests
