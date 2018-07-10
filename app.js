const Express    = require('express')
const Mung 		 = require('express-mung')
const BodyParser = require('body-parser')
const Cors 	     = require('cors')
const Config     = require('config')
const LoggerUtil = require('./utils/LoggerUtil')
const Boom       = require('boom')
const _          = require('lodash')
const App 		 = Express()


App.use(BodyParser.json())
App.use(BodyParser.urlencoded({ extended: true }))
App.use(Cors())

// Services that is not logged.
App.use('/api/v1/logs',  require('./routes/LogRoute'))

App.use(Mung.json(
    (body, req, res) =>
    {
    	/* Logging responses */
    	LoggerUtil.log( body, req, res )

        // There is a field called `hidden`. That field is will not be seen by users. Because it is 
        if ( res.statusCode == 500 )
            return _.pick(body, ['message', 'statusCode', 'error'])
        else
            return body;
    },
    { mungError: true } // This includes error responses.
))


// Services
App.use('/api/v1/users',          require('./routes/UserRoute'))
App.use('/api/v1/authentication', require('./routes/AuthenticationRoute'))

// API Documents
App.use('/api/doc', Express.static('doc'))

// Handling errors.
App.use((error, req, res, next) =>
{
    let boomError = error

    if ( !error.isBoom )
        boomError = Boom.badImplementation(error.message, error.stack)
    
    let payload = boomError.output.payload

    // If it is a server error like 500.
    if ( boomError.isServer )
        payload.hidden = boomError.data 

    res.status(boomError.output.payload.statusCode).json(payload)   
})

App.listen(Config.get('port'))




module.exports = App // For testing