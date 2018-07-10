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

            const user = await User.findOne({ email })
            const isPasswordOk = await Bcrypt.compare(password, _.get(user, 'password', null))

      
                
            if ( !isPasswordOk )
                next(Boom.unauthorized('Password is wrong.'))
            else
                next()
        }
        catch (error)
        {
            next(error) 
        }  
    } 

    static async isUserEmailExists ( req, res, next )
    {
        try
        {
            const { email } = req.body
            const user = await User.findOne({ email })

            if ( user )
                next()
            else
                next(Boom.unauthorized('User is not found.'))
        }
        catch (error)
        {
            next(error)
        }
    }
        
}


module.exports = UserValidation