const Joi = require('joi')
const _   = require('lodash')

class ParameterValidation
{


    static emailRequired ( req, res, next )
    {
        const email  = Joi.string().email().required()
        const result = Joi.validate(( req.method === 'GET' ) ? req.query : req.body, { email }, { allowUnknown: true })

        if ( _.get(result, 'error.details') )
            res.status(500).json(result.error.details[0])
        else
            next()
    }

    static passwordRequired ( req, res, next )
    {
        const password = Joi.string().required()
        const result   = Joi.validate(( req.method === 'GET' ) ? req.query : req.body, { password }, { allowUnknown: true })

        if ( _.get(result, 'error.details') )
            res.status(500).json(result.error.details[0])
        else
            next()
    }

    static isLimitInteger ( req, res, next )
    {
        const limit  = Joi.number().integer()
        const result = Joi.validate(( req.method === 'GET' ) ? req.query : req.body, { limit }, { allowUnknown: true })

        if ( _.get(result, 'error.details') )
            res.status(500).json(result.error.details[0])
        else
            next()
    }

}
module.exports = ParameterValidation