// ### Validations ###
const { emailRequired, passwordRequired } = require('../validations/ParameterValidation')
const { isUserExists }                    = require('../validations/UserValidation')

const AuthenticationController = require('../controllers/AuthenticationController')

// ### Routes ###
const router = require('express').Router()


/**
* @api {POST} /api/v1/authentication/authenticate To Authenticate user.
* @apiVersion 1.0.0
* @apiName AuthenticateUser
* @apiGroup Authentication
*
* @apiExample {js} Example usage:
* curl http://localhost:5000/api/v1/authentication/authenticate
* 	
*
* @apiSuccessExample {json} Success response:
*     HTTP 200 OK
*     [{"name":"Eyüp","surname":"İbiş","email":"eyupibis@gmail.com", "password": "123456"}]
*
*/

router.post('/authenticate', 
    emailRequired, 
    passwordRequired,
    isUserExists,
        AuthenticationController.authenticate)


module.exports = router