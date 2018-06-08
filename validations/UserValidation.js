const Joi      = require('joi')
const _        = require('lodash')
const Boom     = require('boom')
const Mongoose = require('mongoose')
const Config   = require('config')
const Bcrypt   = require('bcrypt')

// ### Database ###
const Connection = Mongoose.connect( Config.get('database.url') )
const User 		 = require('../models/User')

class UserValidation
{
    static async isUserExists ( req, res, next )
    {
        try
        {
            const { email, password } = req.body

            // Checking email.
            const user = await User.findOne({ email })

            if ( !user )
                throw Boom.unauthorized('Email is not found.')

            // Checking password.
            const isPasswordOk = await Bcrypt.compare(password, user.password)

            if ( !isPasswordOk )
                throw Boom.unauthorized('Password is wrong.')

            next()
        }
        catch (error)
        {
            if ( error.isBoom )
                res.status(error.output.payload.statusCode).json(error.output.payload)
            else
                res.status(500).json(error)
        }
    } 
        
}


module.exports = UserValidation