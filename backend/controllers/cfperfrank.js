const users = require('../models/users')
const cfContests = require('../models/cfcontests')

async function fetchCFPerfRank(data) {
    try {
        const year = data[0]
        const month = data[1]
        const best = data[2]
        const startDate = new Date(year, month - 1, 1, 0, 0, 0)
        const endDate = new Date(year, month, 0, 23, 59, 59)

        const contests = await cfContests.find({
            date: {
                $gte: startDate,
                $lte: endDate
            }
        }).sort({ date: 1 })

        if(contests.length === 0 || best == 0) return []

        const ranklist = {}
        const fetchedUsers = await users.find({})
        const handles = fetchedUsers.map(fetchedUsers => fetchedUsers.cfHandle)

        for (const contest of contests) {
            for (const handle of handles) {
                if (!ranklist[handle]) ranklist[handle] = {}
                ranklist[handle][`${contest.name}`] = 0
            }
            for (const data of contest.data) {
                if (handles.includes(data.handle)) {
                    ranklist[data.handle][`${contest.name}`] = data.performanceRating
                }
            }
        }

        for (const user of handles) {
            const values = []
            for (const contest of Object.keys(ranklist[user])) {
                values.push(ranklist[user][contest])
            }
            values.sort((a, b) => b - a)
            let sum = 0
            for (let i = 0; i < best; i++) sum += values[i]
            ranklist[user][`Sum of Best ${best}`] = sum
        }

        const ranklistEntries = Object.entries(ranklist);

        ranklistEntries.sort((a, b) => b[1][`Sum of Best ${best}`] - a[1][`Sum of Best ${best}`]);

        const finalRanklist = []

        const headers = ['Rank', 'Handle']

        for (const header of Object.keys(ranklistEntries[0][1])) {
            headers.push(header)
        }

        finalRanklist.push(headers)

        let rank = 1
        for (const entry of ranklistEntries) {
            const row = [rank++]
            row.push(entry[0])
            for (const data of Object.values(entry[1])) {
                row.push(data)
            }
            finalRanklist.push(row)
        }
        return finalRanklist
    } catch (error) {
        console.log('Error while fetching CF performance rank')
    }
}

module.exports = fetchCFPerfRank