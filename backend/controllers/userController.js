const bycript = require('bycript')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const users = require('../models/users')
const tempUsers = require('../models/tempusers')


const createToken = (_id) => {
    jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const signupUser = async (req, res) => {
    try{
        const data = req.body

        if(!validator.isEmail(data.email)) {
            throw Error('Email is not valid')
        }

        if(!validator.isStrongPassword(data.password)){
            throw Error('Password not strong enough')
        }

        const existingUser = await users.findOne({email: data.email})
        const unapprovedUser = await tempUsers.findOne({email: data.email})

        if(existingUser) {
            res.send('Existing User')
        }
        if(unapprovedUser){ 
            res.send('Unapproved User')
        }

        const salt = await bycript.genSalt(10)
        const hash = await bycript.hash(data.password, salt)
        data.password = hash

        const tempUser = new tempUsers(data)
        await tempUser.save()

    } catch(error){
        console.log(error)
        res.status(500).send('Server Error')
    }
}

const loginUser = async (req, res) => {
    const data = req.body

    const user = await users.findOne({email: data.email})
    if(!user){
        throw Error('Email not valid')
    }

    const match = await bcrypt.compare(data.password, user.password)
    if(!match) {
        throw Error('Incorrect password')
    }

    const token = createToken(user._id)
}

const addUser = async (req, res) => {
    const data = req
    const query = users.find({email: data})
    const user = new users(query)
    await user.save()
    tempUsers.deleteOne(query)
}

const removeUser = async (req, res) => {
    const data = req
    const query = users.find({email: data})
    tempUsers.deleteOne(query)
}   

module.exports = {signupUser, loginUser, addUser, removeUser}