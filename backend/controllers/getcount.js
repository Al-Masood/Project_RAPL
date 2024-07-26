const cfContests = require('../models/cfcontests.js')

async function getCount(req, res) {
    try {
        const data = req.body
        const year = data.year
        const month = data.month
        const startDate = new Date(year, month - 1, 1, 0, 0, 0)
        const endDate = new Date(year, month, 0, 23, 59, 59)

        const count = await cfContests.countDocuments({
            date: {
                $gte: startDate,
                $lte: endDate
            }
        })

        res.status(200).send(JSON.stringify(count))

    }
    catch {
        res.status(400).send('Error while getting count of CF contests')
    }
}

module.exports = getCount