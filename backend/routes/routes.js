const express = require('express')
const router = express.Router()

const  {signupUser, loginUser, getTempUsers, addUser, removeUser, getChangeRequests, requestChange, approveChange, denyChange, changePassword, requestPasswordReset, resetPassword } = require('../controllers/userController')
const addVJContest = require('../controllers/addvjcontest')
const cfRating = require('../controllers/cfrating')
const cfActivity = require('../controllers/cfactivity')
const cfStandings = require('../controllers/cfstandings')
const getContests = require('../controllers/getcontests')
const cfPerformance = require('../controllers/cfperformance')
const tfcRanklist = require('../controllers/tfcranklist')
const getCount = require('../controllers/getcount')


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

router.post('/requestpasswordreset', requestPasswordReset)

router.post('/resetpassword', resetPassword)

router.post('/cfrating', cfRating)

router.post('/cfactivity', cfActivity)

router.post('/cfstandings', cfStandings)

router.get('/getcontests', getContests)

router.post('/cfcontestcount', getCount)

router.post('/cfperformance', cfPerformance)

router.post('/tfcranklist', tfcRanklist)

router.post('/addvjcontest', addVJContest)

module.exports = router