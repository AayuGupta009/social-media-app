const { Schema } = require('mongoose')
const validate = require('mongoose-validator')

const db = require('config/database').getUserDB()

const nameValidator = [
   validate({
      validator: 'isLength',
      arguments: [0, 40],
      message: 'Name must not exceed {ARGS[1]} characters.'
   })
]

const emailValidator = [
   validate({
      validator: 'isLength',
      arguments: [0, 60],
      message: 'Email must not exceed {ARGS[1]} characters.'
   }),
   validate({
      validator: 'isEmail',
      message: 'Email must be valid.'
   })
]

const userSchema = new Schema(
   {
      email: {
         type: String,
         required: [true, 'Email is required.'],
         unique: [true, 'Email has already registered.'],
         validate: emailValidator,
         lowercase: true,
         trim: true
      },
      password: String,

      firstName: {
         type: String,
         required: false,
         trim: true,
         validate: nameValidator
      },
      lastName: {
         type: String,
         trim: true,
         validate: nameValidator
      },
      phoneNumber: Number,
      countryCode: {
         type: String,
         trim: true
      },
      isEmailVerified: {
         type: Boolean,
         default: false
      },
      isPhoneVerified: {
         type: Boolean,
         default: false
      },
      activationKey: String,
      deviceToken: String,
      otp: Number,
      otpExpires: Date,
      lastOtpRequestTime: Date,
      accessToken: String,
      resetToken: String
   },
   {
      timestamps: true,
      versionKey: false
   }
)

userSchema.set('toJSON', {
   virtuals: true,
   versionKey: false,
   transform(doc, ret) {
      delete ret.password
   }
})

const User = db.model('User', userSchema)

const create = (user) => new User(user).save()

const getById = (id) =>
   User.findOne({
      _id: id
   })
      .lean()
      .exec()

const getByEmail = (email) =>
   User.findOne({
      email
   })
      .lean()
      .exec()
const getByPhone = (phoneNumber) =>
   User.findOne(
      { phoneNumber }
      // { isPhoneVerified: 1 }
   )
      .lean()
      .exec()

const getByAccessToken = (accessToken) =>
   User.findOne({
      accessToken
   })
      .lean()
      .exec()

const getByResetToken = (resetToken) =>
   User.findOne({ resetToken }, { isPhoneVerified: 1 }).lean().exec()

const updateById = (id, updates) =>
   User.findByIdAndUpdate(
      id,
      {
         $set: updates
      },
      {
         new: true
      }
   )
      .select('-password')
      .lean()
      .exec()

module.exports = {
   create,
   getByEmail,
   getByPhone,
   updateById,
   getByAccessToken,
   getByResetToken,
   getById,
   model: User
}
