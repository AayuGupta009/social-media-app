const User = require('models/user')
const HttpStatus = require('http-status')
const { getOtp } = require('../../../utils/random')
const { sendActivationEmail, sendMessage, hashPassword } = require('services')
const errors = require('errors')
const md5 = require('crypto-js/md5')
const { genrateUserToken } = require('middlewares')
const { SETTINGS } = require('consts')

const signup = async (req, res, next) => {
   try {
      let user = req.validated
      let { email } = user
      const { password } = user
      email = email.toLowerCase()

      const userExist = await User.getByEmail(email)
      if (userExist) {
         return next(errors.userExistsError)
      }

      /* Generate activation key to verify the email */
      const activationKey = md5(
         Math.floor(Math.random() * 10000000000 + 1),
         'hex'
      ).toString()
      console.log(activationKey)
      user.activationKey = activationKey
      user.steps = 1
      user.password = await hashPassword(password)

      user = await User.create(user)

      sendActivationEmail(req, email, activationKey)

      return res.status(HttpStatus.OK).json(user)
   } catch (error) {
      console.log('here..')
      return next(error)
   }
}

const verifyEmail = async (req, res, next) => {
   try {
      const { email, token } = req.params

      const user = await User.getByEmail(email)
      if (!user) {
         return next(errors.userNotFoundError)
      }
      if (user.activationKey !== token) {
         return next(errors.invalidActivationKeyError)
      }

      await User.updateById(user._id, {
         isEmailVerified: true
      })
      res.render('./verification.ejs', {})
   } catch (error) {
      return next(error)
   }
}

const registerPhone = async (req, res, next) => {
   try {
      const { phoneNumber, countryCode, _id } = req.validated

      const user = await User.getByPhone(phoneNumber)
      if (user) {
         return next(errors.userExistsError)
      }
      const otp = getOtp()
      const expireDate = new Date()
      const updates = {
         countryCode,
         phoneNumber,
         otp,
         otpExpires: expireDate.setMilliseconds(
            expireDate.getMilliseconds() + SETTINGS.OTP_EXPIRE
         ),
         lastOtpRequestTime: new Date()
      }
      await User.updateById(_id, updates)

      const phone = countryCode + phoneNumber
      const message = `Your account verification otp is ${otp}`
      console.log(message)
      await sendMessage(message, phone)

      return res.status(HttpStatus.OK).json({
         message: 'OTP sent successfully.'
      })
   } catch (error) {
      return next(error)
   }
}

const getOTP = async (req, res, next) => {
   try {
      const { phoneNumber, countryCode } = req.validated

      const user = await User.getByPhone(phoneNumber)

      if (!user) {
         return next(errors.userNotFoundError)
      }

      /* validate the reset otp time so that user can not request for new otp multiple times */

      const lastOtpRequestTime = new Date(user.lastOtpRequestTime)
      const newOtpResetTime = lastOtpRequestTime.setMilliseconds(
         lastOtpRequestTime.getMilliseconds() + SETTINGS.OTP_ATTEMPT_RESET_TIME
      )
      if (new Date(newOtpResetTime) > new Date()) {
         return next(errors.getOtpAttemtsLimitError)
      }

      /* trigger new otp */
      const otp = getOtp()
      const expireDate = new Date()

      const updates = {
         otp,
         otpExpires: expireDate.setMilliseconds(
            expireDate.getMilliseconds() + SETTINGS.OTP_EXPIRE
         ),
         lastOtpRequestTime: new Date(),
         isPhoneVerified: false
      }
      await User.updateById(user._id, updates)

      const phone = countryCode + phoneNumber
      const message = `Your account verification otp is ${otp}`
      await sendMessage(message, phone)

      return res.status(HttpStatus.OK).json({
         message: 'OTP sent successfully.'
      })
   } catch (error) {
      return next(error)
   }
}

const verifyOTP = async (req, res, next) => {
   try {
      const { phoneNumber, otp } = req.validated

      let user = await User.getByPhone(phoneNumber)
      if (!user) {
         return next(errors.userNotFoundError)
      }

      if (otp !== user.otp || new Date() > new Date(user.otpExpires)) {
         return next(errors.otpExpiredOrWrongError)
      }
      if (
         otp !== SETTINGS.byPassOtp ||
         new Date() > new Date(user.otpExpires)
      ) {
         return next(errors.otpExpiredOrWrongError)
      }
      const token = await genrateUserToken({
         email: user.email,
         _id: user._id
      })
      user = await User.updateById(user._id, {
         isPhoneVerified: true,
         steps: 2,
         accessToken: token
      })
      return res.status(HttpStatus.OK).json(user)
   } catch (error) {
      return next(error)
   }
}

module.exports = {
   signup,
   verifyEmail,
   registerPhone,
   verifyOTP,
   getOTP
}
