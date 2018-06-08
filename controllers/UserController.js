const Mongoose = require('mongoose')
const Config   = require('config')
const _ 	   = require('lodash')
const Bcrypt   = require('bcrypt')

// ### Database ###
const Connection = Mongoose.connect( Config.get('database.url') )
const User 		 = require('../models/User')


class UserController
{
    static async getUsers (req, res)
    {
        const limit = _.toNumber(req.query.limit || 0) // Limit `0` is equal to select all documents.
	
        try
        {
            const users = await User.find().select({ password: 0, is: 0 }).sort({ createdAt: -1 }).limit(limit).lean()

            res.set('X-Total-Count', users.length)
            res.json(users)	
        }
        catch (error)
        {
            res.status(500).json(error)
        }
    }

    static async getUser (req, res)
    {
        try
        {
            const _id  = req.params.id
            const user = await User.findOne({ _id }).select({ password: 0, is: 0 }).lean()

            if ( user )
                res.json(user)
            else
                res.status(204).json(user)
        }
        catch (error)
        {
            res.status(500).json(error)
        }
    }

    static async addUser (req, res)
    {
        try
        {
            let _user 	     = req.body
            _user.password = await Bcrypt.hash(_user.password, Config.get('bcrypt.saltRounds'))

            const user = await User.create( _user )
            res.json(user)
        }
        catch ( error )
        {
            res.status(500).json(error)
        }
    }
}

module.exports = UserController