const Express    = require('express')
const Mung 		 = require('express-mung')
const BodyParser = require('body-parser')
const Cors 	     = require('cors')
const Config     = require('config')
const LoggerUtil = require('./utils/LoggerUtil')
const App 		 = Express()


App.use(BodyParser.json())
App.use(BodyParser.urlencoded({ extended: true }))
App.use(Cors())

// Services that is not logged.
App.use('/api/v1/logs',  require('./routes/LogRoute'))

App.use(Mung.json(
    (body, req, res) =>
    {
    	/* Logging */
    	LoggerUtil.log( body, req, res )

        return body
    },  
    { mungError: true } // This includes error responses.
))


// Services
App.use('/api/v1/users',          require('./routes/UserRoute'))
App.use('/api/v1/authentication', require('./routes/AuthenticationRoute'))

// API Documents
App.use('/api/doc', Express.static('doc'))

App.listen(Config.get('port'))


module.exports = App // For testing