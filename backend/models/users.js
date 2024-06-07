const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    roll: {
        type: String,
        required: true
    },

    cfHandle: {
        type: String,
        required: true
    },

    vjHandle: {
        type: String,
        required: true
    },

    ccHandle: {
        type: String,
        required: false
    },

    atcoderHandle: {
        type: String,
        required: false
    },

    password: {
        type: String,
        required: true
    }

}, {timestamps: true})

userSchema.statics.signup = async function (name, email, roll, cfHandle, vjHandle, ccHandle, atcoderHandle, password) {
    const exists = await this.findOne({email})

    if(exists){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({name, email, roll, cfHandle, vjHandle, ccHandle, atcoderHandle, password: hash})

    return user
}

const users = mongoose.model('users', userSchema)

module.exports = users