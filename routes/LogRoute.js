// ### Validations ###
//const isAuthenticated = require('../../validations/isAuthenticated')

const LogController = require('../controllers/LogController')

// ### Routes ###
const router = require('express').Router()

//router.use(isAuthenticated)

/**
* @api {GET} /api/v1/logs/:id Retrieve log
* @apiVersion 1.0.0
* @apiName GetLog
* @apiGroup Log
*
* @apiExample {js} Example usage:
* curl http://localhost:5000/api/v1/logs/5adf832f0bdc76a0219e2d7e
* 	
*
* @apiSuccessExample {json} Success response:
*     HTTP 200 OK
*     {"name":"Eyüp","surname":"İbiş","email":"eyupibis@gmail.com", "password": "123456"}
*
*/
router.get('/:id', 
		LogController.getLog)

/**
* @api {GET} /api/v1/logs/ Retrieve logs
* @apiVersion 1.0.0
* @apiName GetLogs
* @apiGroup Log
*
* @apiExample {js} Example usage:
* curl http://localhost:5000/api/v1/logs
* 	
*
* @apiSuccessExample {json} Success response:
*     HTTP 200 OK
*     [{"name":"Eyüp","surname":"İbiş","email":"eyupibis@gmail.com", "password": "123456"}]
*
*/

router.get('/', 
		LogController.getLogs)


module.exports = router