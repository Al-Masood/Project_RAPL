const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cfContestsSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        require: true
    },
    data: [{
        handle: {
            type: String,
            required: true
        },
        performanceRating: {
            type: Number,
            required: true
        }
    }]
}, {timestamps: true})

cfContests = mongoose.model(`cfcontests`, cfContestsSchema)

module.exports = cfContests