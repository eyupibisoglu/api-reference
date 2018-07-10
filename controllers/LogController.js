const Mongoose = require('mongoose')
const Config   = require('config')
const _ 	   = require('lodash')

// ### Database ###
const Connection = Mongoose.connect( Config.get('database.url') )
const Log 		 = require('../models/Log')


class LogController
{
    static async getLogs (req, res, next)
    {
        try
        {
            const logs = await Log.find().lean()

            res.set('X-Total-Count', logs.length)
            res.json(logs)	
        }
        catch (error)
        {
            next(error)
        }
    }

    static async getLog (req, res, next)
    {
        try
        {
            const _id = req.params.id
            const log = await Log.findOne({ _id }).lean()

            res.json(log)	
        }
        catch (error)
        {
            next(error)
        }
    }
}

module.exports = LogController