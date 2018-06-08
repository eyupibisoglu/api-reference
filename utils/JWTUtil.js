const JWT = require('jsonwebtoken')

/* This util is promisifying the json web token package's methods.
 *
 */

class JWTUtil
{
    sign ( payload, secret, options )
    {
        return new Promise((resolve, reject) =>
        {
            JWT.sign(payload, secret, options, ( error, accessToken ) =>
            {
                if ( !error )
                    resolve(accessToken)
                else
                    reject(error)
            });
       })
    }

    verify ( accessToken, secret )
    {
        return new Promise((resolve, reject) =>
        {
            JWT.verify(accessToken, secret, (error, decoded) =>
            {
                if ( !error )
                    resolve(decoded)
                else
                    reject(error)
            });
        })
    }
}

module.exports = new JWTUtil()