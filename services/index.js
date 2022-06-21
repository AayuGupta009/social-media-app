const { sendActivationEmail, sendVerificationEmail,
    sendForgotPasswordEmail } = require('./email');
// const { sendMessage } = require('./sms');
const { hashPassword } = require('./auth');
// const { sendIosPush } = require('./push');

module.exports = {
    sendActivationEmail,
    // sendMessage,
    hashPassword,
    sendVerificationEmail,
    sendForgotPasswordEmail,
    // sendIosPush
};
