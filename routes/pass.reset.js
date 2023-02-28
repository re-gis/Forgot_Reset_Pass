const { User } = require("../models/user.model");
const express = require("express");
const Token = require("../models/token.model");
const { sendEmail } = require("../utils/email");
const router = express.Router();
const Joi = require("joi");
const crypto = require("crypto");
const { schema } = require("../models/token.model");

router.post('/pass', async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });
    const { error } = schema.validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message)
    } else {
        const user = await User.findOne({ email: req.body.email })
        if(!user) {
            res.send('User not found...')
        } else {
            let token = await Token.findOne({ userId: user._id})
            if(!token) {
                token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString('hex')
                }).save()
            } 
            const link = `${process.env.BASE_URL}/api/reset/${user._id}/${token.token}`
            await sendEmail(user.email, 'Password reset...', link)
            res.send('Pass reset link sent...')
        }
    }
  } catch (err) {
    console.log(err);
    res.send('An error occurred...')
  }
});


router.post('/:userId/:token', async(req, res) => {
    try {
        const schema = Joi.object({password: Joi.string().required()})
        const { error } = schema.validate(req.body)
        if(error) {
            return res.send(error.details[0].message)
        } else {
            const user = await User.findById(req.params.userId)
            if(!user) {
                res.send('Invalid or expired link...')
            } else {
                const token = await Token.findOne({
                    userId: user._id,
                    token: req.params.token
                })

                if(!token) {
                    res.send('Invalid or expired link...')
                } else {
                    user.password = req.body.password
                    await user.save()
                    await Token.findOneAndRemove()
                    res.send('Password reset...')
                }
            }
        }
    } catch (err) {
        console.log(err);
        res.send('Error...')
    }
})

module.exports = router
