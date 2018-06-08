class LoggerUtil
{
    log ( body, req, res )
    {
        const Config     = require('config')
        const Mongoose	 = require('mongoose')
        const _			 = require('lodash')

        Mongoose.connect( Config.get('database.url') )
        const Log = require('../models/Log')
        let data 

        if ( res.statusCode < 300 )
            data = _.isArray(body) ? ( _.map(body,'_id') ) : ( _.has(body, '_id') ? _.at(body, '_id') : undefined )
        else
            data = body

        const request  = { "method": req.method, "action": req.originalUrl.split("?").shift(), "data": ( req.method === 'GET' ) ? req.query : req.body }
        const response = { "status": res.statusCode, data }

        Log.create({ request, response })
    }
}

module.exports = new LoggerUtil()