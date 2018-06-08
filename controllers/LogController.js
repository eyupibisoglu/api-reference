const Mongoose = require('mongoose')
const Config   = require('config')
const _ 	   = require('lodash')

// ### Database ###
const Connection = Mongoose.connect( Config.get('database.url') )
const Log 		 = require('../models/Log')


class LogController
{
    static async getLogs (req, res)
    {
        try
        {
            const logs = await Log.find().lean()

            res.set('X-Total-Count', logs.length)
            res.json(logs)	
        }
        catch (error)
        {
            res.status(500).json(error)
        }
    }

    static async getLog (req, res)
    {
        try
        {
            const _id = req.params.id
            const log = await Log.findOne({ _id }).lean()

            res.json(log)	
        }
        catch (error)
        {
            res.status(500).json(error)
        }
    }
}

module.exports = LogController