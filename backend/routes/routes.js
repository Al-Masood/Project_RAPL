const express = require('express')
const router = express.Router()

const  {signupUser, loginUser, getTempUsers, addUser, removeUser, getChangeRequests, requestChange, approveChange, denyChange, changePassword } = require('../controllers/userController')
const getCount = require('../controllers/getcount')
const fetchCFRanklist = require('../controllers/cfperfrank')
const addVJContest = require('../controllers/addvj')
const fetchVJRanklist = require('../controllers/vjrank')
const cfRating = require('../controllers/cfrating')
const cfActivity = require('../controllers/cfactivity')


router.post('/signup', signupUser)

router.post('/login', loginUser)

router.get('/gettempusers', getTempUsers)

router.post('/adduser', addUser)

router.post('/removeuser', removeUser)

router.get('/getchangerequests', getChangeRequests)

router.post('/requestchange', requestChange)

router.post('/approvechange', approveChange)

router.post('/denychange', denyChange)

router.post('/changepassword', changePassword)

router.post('/cfrating', cfRating)

router.post('/cfactivity', cfActivity)

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