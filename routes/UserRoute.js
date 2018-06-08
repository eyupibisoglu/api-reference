const { isLimitInteger, emailRequired, passwordRequired } = require('../validations/ParameterValidation')


// ### Validations ###
//const isAuthenticated = require('../../validations/isAuthenticated')

const UserController = require('../controllers/UserController')

// ### Routes ###
const router = require('express').Router()

/**
* @api {GET} /api/v1/users/:id Retrieve user by id
* @apiVersion 1.0.0
* @apiName GetUser
* @apiGroup User
*
* @apiExample {js} Example usage:
* curl https://api.eyupibisoglu.com/api/v1/users/5adda78d2feda190861b6d29
*
* @apiSuccessExample {json} Success response:
*     HTTP 200 OK
*     {"_id":"5adda78d2feda190861b6d29","is":{"active":true},"name":"Eyüp","surname":"İbişoğlu","email":"ibisoglueyup@gmail.com"}
*
*/

router.get('/:id', 
		UserController.getUser)


/**
* @api {GET} /api/v1/users Retrieve users
* @apiVersion 1.0.0
* @apiName GetUsers
* @apiGroup User
*
* @apiExample {js} Example usage:
* curl https://api.eyupibisoglu.com/api/v1/users
*
* @apiSuccessExample {json} Success response:
*     HTTP 200 OK
*     [{"_id":"5adda78d2feda190861b6d29","name":"Eyüp","surname":"İbişoğlu","email":"ibisoglueyup@gmail.com"},{"_id":"5addb821de9b3b932aa12f87","name":"Eyüp","surname":"İbişoğlu","email":"ibisoglueyup1@gmail.com"}]
*
*/

router.get('/', 
	isLimitInteger, 
		UserController.getUsers)


/**
* @api {POST} /api/v1/users Insert a new user
* @apiVersion 1.0.0
* @apiName AddUser
* @apiGroup User
*
* @apiHeader {String} Content-Type Content type of request.
* @apiHeader {String} Authorization The authorization token.
* 
* @apiParam {String} name     The user name.
* @apiParam {String} surname  The user surname.
* @apiParam {String} email    The user email.
* @apiParam {String} password The user password.
* @apiParam {Object} is
* @apiParam {Boolean} [is.active=true]  Status of user.
* 
* @apiExample {curl} Example Request
* curl --url http://localhost:5000/api/v1/users/ -H "Content-Type: application/json" -X POST \
* 	--data '{"name":"Eyüp","surname":"İbiş","email":"eyupibis@gmail.com", "password": "123456"}'
* 	
*
* @apiSuccessExample {json} Success Response
*     HTTP 200 OK
*     { user }
*
* @apiError Unauthorized Token not ok.
*/

router.post('/', 
	emailRequired, 
	passwordRequired, 
		UserController.addUser)

module.exports = router