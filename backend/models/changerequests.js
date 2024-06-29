const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ChangeRequestSchema = new Schema({
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
    }

}, {timestamps: true})

const ChangeRequests = mongoose.model('ChangeRequests', ChangeRequestSchema)

module.exports = ChangeRequests