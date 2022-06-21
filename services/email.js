const nodemailer = require('nodemailer')
const { env } = process
// const constants = require('consts');

const transporter = nodemailer.createTransport({
   host: env.SMTP_HOST,
   port: 465,
   secure: true, // use SSL
   auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS
   },
   tls: {
      rejectUnauthorized: false
   }
})

const sendEmail = async (mailOptions) => {
   mailOptions.from = env.SMTP_EMAIL
   await transporter.sendMail(mailOptions)
}

const sendActivationEmail = async (req, email, activationKey) => {
   /* generate activation link */
   const activationUrl = `${req.protocol}://${req.get(
      'host'
   )}/incard/v1/user/verify/email/${email}/${activationKey}`
   const message = `Hello,<p>Thanks for signing up!<br><br>Please click this link to activate your account:</p><a href='${activationUrl}'>${activationUrl}</a><p>Thanks,<br>InCard Team</p>`
   console.log(activationUrl)
   const mailOptions = {
      to: email,
      subject: 'Verification Email',
      html: message
   }

   console.log(mailoptions)
   sendEmail(mailOptions)
}

const sendVerificationEmail = async (email, message) => {
   const mailOptions = {
      to: email,
      subject: 'Verification Email',
      html: message
   }
   sendEmail(mailOptions)
}

const sendForgotPasswordEmail = async (
   req,
   email,
   name,
   phoneNumber,
   countryCode,
   resetToken
) => {
   /* generate resetPassword link */
   const emailUrl = new URL(`${env.apiUrl}/incard/v1/user/resetPassword`)
   if (phoneNumber) emailUrl.searchParams.append('phoneNumber', phoneNumber)
   if (countryCode) emailUrl.searchParams.append('countryCode', countryCode)
   if (resetToken) emailUrl.searchParams.append('resetToken', resetToken)

   const message =
      `Hello ${name},<br> <p>In order to reset your password, just click the link below and` +
      ` you’ll <br> be taken to the reset password screen:</p><a href='${emailUrl}'>${emailUrl}</a><p>Thanks,<br>InCard Team</p>`

   const mailOptions = {
      to: email,
      subject: 'InCard - Reset Password Request',
      html: message
   }
   sendEmail(mailOptions)
}

const sendCardDormantEmail = ({ email, name, last4Digit }) => {
   const message = `Hello ${name},<br> <p>
    Your card ending in ****${last4Digit} will enter a dormant state in 6 days! Use it now to avoid Dormancy fees!
    <p>Thanks,<br>InCard Team</p>`

   const mailOptions = {
      to: email,
      subject: 'InCard - Dormant Card Notification',
      html: message
   }
   sendEmail(mailOptions)
}

const sendCardExitedDormantEmail = ({ email, name, last4Digit }) => {
   const message = `Hello ${name},<br> <p>
    Your card ending in ****${last4Digit} has been activated and exited from dormancy state!
    <p>Thanks,<br>InCard Team</p>`

   const mailOptions = {
      to: email,
      subject: 'InCard - Card Activated Notification',
      html: message
   }
   sendEmail(mailOptions)
}

module.exports = {
   sendEmail,
   sendActivationEmail,
   sendVerificationEmail,
   sendForgotPasswordEmail,
   sendCardDormantEmail,
   sendCardExitedDormantEmail
}
