const users = require('../models/users')

const signupUser = async (req, res) => {
    const data = req.body
    try{
        const user = await users.signup(data)
        res.status(200).json({user})
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

const loginUser = async (req, res) => {
    
}


module.exports = {loginUser, signupUser}