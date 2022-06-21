const User = require('models/user')
const errors = require('errors')
const jwt = require('jsonwebtoken')
const { SETTINGS } = require('consts')

const { env } = process

const authenticate = (req, res, next) => {
   const accessToken = req.headers.token

   if (!accessToken) {
      return next(errors.noTokenProvided)
   }
   jwt.verify(accessToken, env.JWT_SECRET_KEY, async (error, decoded) => {
      if (error) {
         return next(errors.invalidToken)
      } else if (decoded._id == 0 || undefined || '') {
         return next(errors.userNotFoundError)
      } else {
         const result = await User.getByAccessToken(accessToken)
         if (result) {
            req.data = {
               _id: decoded._id,
               email: decoded.email,
               accessToken,
               mobile: (result.countryCode || '') + (result.phoneNumber || '')
            }
            return next()
         } else {
            return next(errors.sessionExpired)
         }
      }
   })
}

const genrateUserToken = (data) => {
   const options = { expiresIn: SETTINGS.expiresIn }
   return jwt.sign(data, env.JWT_SECRET_KEY, options)
}

module.exports = {
   authenticate,
   genrateUserToken
}
