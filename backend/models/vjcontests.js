const mongoose = require('mongoose')

const Schema = mongoose.Schema

const vjContestsSchema = new Schema({
    number: {
        type: Number,
        required: true
    },

    data: [{
        handle: {
            type: String,
            required: true
        },
        solved: {
            type: Number,
            required: true
        },
        penalty: {
            type: Number,
            required: true
        }
    }]
}, {timestamps: true})

vjContests = mongoose.model(`vjcontest`, vjContestsSchema)

module.exports = vjContests