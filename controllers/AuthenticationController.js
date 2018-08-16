const Mongoose = require('mongoose')
const Config   = require('config')
const _ 	   = require('lodash')
const JWTUtil  = require('../utils/JWTUtil')
const Boom     = require('boom')

// ### Database ###
const Connection = Mongoose.connect( Config.get('database.url'), { autoIndex: false })
const User 		 = require('../models/User')


class AuthenticationController
{
    static async authenticate (req, res, next)
    {
        try
        {
            const { email, password } = req.body
    
            const user = await User.findOne({ email })
            
            const expiresIn = Config.jwt.expiresIn
            const secret    = Config.jwt.secret
            const data      = { _id: user._id }
    
            // Generating token.
            const accessToken = await JWTUtil.sign({ data }, secret, { expiresIn })

            res.json({ user, accessToken })
        }
        catch (error)
        {
            next(error)
        }
       
    }

    
}

module.exports = AuthenticationController