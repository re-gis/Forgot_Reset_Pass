const mongoose = require('mongoose')
const userModel = mongoose.Schema
const Joi = require('joi')

const userSchema = new userModel({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String, 
        required: true
    },

    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const User = mongoose.model('User', userSchema)


const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    return schema.validate(user)
}

module.exports = {
    User,
    validate
}