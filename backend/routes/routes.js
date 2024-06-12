const express = require('express')
const router = express.Router()

const {signupUser, loginUser, addUser, removeUser} = require('../controllers/userController')
const getCount = require('../controllers/getcount')
const fetchCFRanklist = require('../controllers/cfperfrank')
const addVJContest = require('../controllers/addvj')
const fetchVJRanklist = require('../controllers/vjrank')


router.post('/signup', async (req, res) => {
    await signupUser(req)
    console.log('Temporary User Added')
})

router.post('/login', () => {

})

router.post('/adduser', async (req, res) => {
    await addUser(req)
    res.send('User Added')
})

router.post('/removeuser', async (req, res) => {
    await removeUser(req)
    res.send('User Removed')
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