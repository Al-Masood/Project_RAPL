const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const users = require('../models/users')
const tempUsers = require('../models/tempusers')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

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
        res.status(200).json({name: user.name, token})
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

module.exports = { signupUser, loginUser, getTempUsers, addUser, removeUser }
