const express = require('express')
const router = express.Router()

const {signupUser, loginUser} = require('../controllers/user')
const getCount = require('../controllers/getcount')
const fetchCFRanklist = require('../controllers/cfperfrank')
const addVJContest = require('../controllers/addvj')
const fetchVJRanklist = require('../controllers/vjrank')


router.post('/signup', (req, res) => {
    
})

router.post('/login', () => {

})



router.post('/cfcontestcount', async (req, res) => {
    const data = req.body
    const count = await getCount(data)
    const response = JSON.stringify(count)
    res.send(response)
})

router.post('/cfranklist', async (req, res) => {
    const data = req.body
    const ranklist = await fetchCFRanklist(data)
    res.send(ranklist)
})

router.post('/vjudgeranklist', async (req, res) => {
    const contestNumbers = req.body
    const ranklist = await fetchVJRanklist(contestNumbers)
    res.send(ranklist)
})

router.post('/vjaddcontest', async (req, res) => {
    const contestData = req.body
    await addVJContest(contestData)
})

module.exports = router