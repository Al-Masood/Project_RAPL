const users = require('../models/users')

async function cfRating(req, res) {
    try {
        const type = req.body.type
        const fetchedUsers = await users.find({})
        
        let ranklist = [...fetchedUsers]
        const sortFunction = (a, b) => {
            if (type === 'CurrentRating') {
                return b.rating !== a.rating ? b.rating - a.rating : b.maxRating - a.maxRating
            } else {
                return b.maxRating !== a.maxRating ? b.maxRating - a.maxRating : b.rating - a.rating
            }
        }

        ranklist.sort(sortFunction)

        res.json(ranklist)
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching users' })
    }
}

module.exports = cfRating