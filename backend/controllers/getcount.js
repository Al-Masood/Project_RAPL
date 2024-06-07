const cfContests = require('../models/cfcontests.js')

async function getCount(data) {
    try {
        const year = data[0]
        const month = data[1]
        const startDate = new Date(year, month - 1, 1, 0, 0, 0)
        const endDate = new Date(year, month, 0, 23, 59, 59)

        const count = await cfContests.countDocuments({
            date: {
                $gte: startDate,
                $lte: endDate
            }
        })

        return count
        
    } catch (error) {
        console.log('Error while getting count of CF contests')
    }
}

module.exports = getCount