const Joi  = require('joi')
const _    = require('lodash')
const Boom = require('boom')

class ParameterValidation
{
    static emailRequired ( req, res, next )
    {
        const schema = 
        {
            email: Joi.string().email().required()
        }
        
        Joi.validate(( req.method === 'GET' ) ? req.query : req.body, schema, { allowUnknown: true })
            .then(result => next())
            .catch(error => next(Boom.conflict(error.details[0].message)))
    }

    static passwordRequired ( req, res, next )
    {
        const schema =
        {
            password: Joi.string().required()
        }
        
        Joi.validate(( req.method === 'GET' ) ? req.query : req.body, schema, { allowUnknown: true })
            .then(result => next())
            .catch(error => next(Boom.conflict(error.details[0].message)))
    }

    static isLimitInteger ( req, res, next )
    {
        const schema = 
        {
            limit: Joi.number().integer()
        }

        Joi.validate(( req.method === 'GET' ) ? req.query : req.body, schema, { allowUnknown: true })
            .then(result => next())
            .catch(error => next(Boom.conflict(error.details[0].message)))
    }

}
module.exports = ParameterValidation