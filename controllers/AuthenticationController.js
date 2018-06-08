const Mongoose = require('mongoose')
const Config   = require('config')
const _ 	   = require('lodash')
const JWTUtil  = require('../utils/JWTUtil')
const Boom     = require('boom')

// ### Database ###
const Connection = Mongoose.connect( Config.get('database.url') )
const User 		 = require('../models/User')


class AuthenticationController
{
    static async authenticate (req, res)
    {
        try
        {
            const { email, password } = req.body

            const user = await User.findOne({ "email": email })

           
            const expiresIn = Config.jwt.expiresIn
            const secret    = Config.jwt.secret
            const data      = { _id: user._id }

            // Generating token.
            const accessToken = await JWTUtil.sign({ data }, secret, { expiresIn })
            
            res.json({ user, accessToken })
                
        }
        catch ( error )
        {
            if ( error.isBoom )
                res.status(error.output.payload.statusCode).json(error.output.payload)
            else
                res.status(500).json(error)
        }
    }

    
}

module.exports = AuthenticationController