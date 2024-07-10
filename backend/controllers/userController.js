const bcrypt = require('bcrypt')
const crypto = require('crypto');
const validator = require('validator')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const users = require('../models/users')
const tempUsers = require('../models/tempusers')
const changeRequests = require('../models/changerequests')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth : {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

const signupUser = async (req, res) => {
    try {
        const data = req.body

        if (!validator.isEmail(data.email)) {
            return res.status(400).send('Email is not valid')
        }

        if (!validator.isStrongPassword(data.password)) {
            return res.status(400).send('Password is not strong enough')
        }

        const existingUser = await users.findOne({ email: data.email })
        const unapprovedUser = await tempUsers.findOne({ email: data.email })

        if (existingUser) {
            return res.status(400).send('Existing User')
        }
        if (unapprovedUser) {
            return res.status(400).send('Unapproved User')
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(data.password, salt)
        data.password = hash

        const tempUser = new tempUsers(data)
        await tempUser.save()

        res.status(200).send('User added to temporary approval list')
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

const loginUser = async (req, res) => {
    try {
        const data = req.body

        const user = await users.findOne({ email: data.email })
        if (!user) {
            return res.status(400).send('Incorrect Email')
        }

        const match = await bcrypt.compare(data.password, user.password)
        if (!match) {
            return res.status(400).send('Incorrect Password')
        }

        const token = createToken(user._id)
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(500).send()
    }
}

const getTempUsers = async (req, res) => {
    try {
        const query = await tempUsers.find({})
        res.status(200).send(query)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

const addUser = async (req, res) => {
    try {
        const data = req.body
        const query = await tempUsers.findOne({ email: data.email })
        if (!query) {
            return res.status(400).send('No such user in temporary users')
        }

        const user = new users(query.toObject())
        await user.save()
        await tempUsers.deleteOne({ email: data.email })

        res.status(200).send('User added to main database')
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

const removeUser = async (req, res) => {
    try {
        const data = req.body
        await tempUsers.deleteOne({ email: data.email })
        res.status(200).send('User removed from temporary list')
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

const getChangeRequests = async (req, res) => {
    try {
        const query = await changeRequests.find({})
        res.status(200).send(query)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

const requestChange = async (req, res) => {
    try {
        const data = req.body

        const user = new changeRequests(data)
        await user.save()

        res.status(200).send('Change Request Saved')
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

const approveChange = async (req, res) => {
    try {
        const data = req.body
        const user = await users.findOne({email: data.email})

        if (!user) {
            console.error(`User with email ${data.user} not found`);
            return res.status(404).send('User not found');
        }

        for (const key in data) {
            if(key == '_id') continue
            if (data.hasOwnProperty(key)) {
                user[key] = data[key];
            }
        }

        await user.save()
        await changeRequests.deleteOne({ _id: data._id })
        res.status(200).send('Request Approved')
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

const denyChange = async (req, res) => {
    try {
        const data = req.body
        await changeRequests.deleteOne({ _id: data._id })
        res.status(200).send('Request Denied')
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

const changePassword = async (req, res) => {
    const data = req.body
    const user = await users.findOne({email: data.email})
    const match = await bcrypt.compare(data.oldPassword, user.password)

    if (!match) {
        return res.status(400).send('Incorrect Password')
    }

    if (!validator.isStrongPassword(data.newPassword)) {
        return res.status(400).send('Password is not strong enough')
    }

    if(data.newPassword != data.confirmPassword){
        return res.status(400).send('Passwords do not match')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(data.newPassword, salt)
    user.password = hash
    await user.save()

    res.status(200).send('Password Changed Succesfully')
}

const requestPasswordReset = async (req, res) => {
    try{
        const {email} = req.body
        if(!validator.isEmail(email)){
            return res.status(400).send('Email is not valid')
        }
        
        const user = await users.findOne({email})

        if(!user){
            return res.status(400).send('No user found with this email')
        }

        const currentTime = Date.now();
        const fiveMinutes = 5 * 60 * 1000;

        if (user.resetPasswordExpires && currentTime < user.resetPasswordExpires - (3600000 - fiveMinutes)) {
            return res.status(400).send('Password reset link already sent. Please wait a few minutes before requesting again.');
        }

        const token = crypto.randomBytes(20).toString('hex')
        user.resetPasswordToken = token,
        user.resetPasswordExpires = Date.now() + 3600000

        await user.save()

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://${req.headers.host}/reset/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        }

        transporter.sendMail(mailOptions, (err) => {
            if(err) {
                console.log(err)
                return res.status(500).send('Error sending email')
            }
            res.status(200).send('Recovery email sent')
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

const resetPassword = async (req, res) => {
    try {
        const data = req.body

        const user = await users.findOne({
            resetPasswordToken: data.token,
            resetPasswordExpires: { $gt: Date.now()}
        })

        if(!user){
            return res.status(400).send('No such password reset link created')
        }

        if (!validator.isStrongPassword(data.newPassword)) {
            return res.status(400).send('Password is not strong enough')
        }
    
        if(data.newPassword != data.confirmPassword){
            return res.status(400).send('Passwords do not match')
        }
    
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(data.newPassword, salt)
        user.password = hash
        user.resetPassword = undefined
        user.resetPasswordExpires= undefined
        await user.save()
        
        res.status(200).send('Password Reset Succesfully')


    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

module.exports = { signupUser, loginUser, getTempUsers, addUser, removeUser, getChangeRequests, requestChange, approveChange, denyChange, changePassword, requestPasswordReset, resetPassword }