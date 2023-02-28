const mongoose = require('mongoose')
const Joi = require('joi')
const tokenModel = mongoose.Schema

const tokenSchema = new tokenModel({
    userId: {
        type: tokenModel.Types.ObjectId,
        required: true,
        ref: 'user'
    },

    token: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: '5m'
    }
})

module.exports = mongoose.model('Token', tokenSchema)