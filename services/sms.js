const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
const from = process.env.SMS_FROM;

const clientTwilio = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});

function sendMessage (textmessage, mobile) {
    return new Promise((resolve, reject) => {
        clientTwilio.messages.create(
            {
                body: textmessage,
                to: mobile, // Text this number
                from // From a valid Twilio number
            },
            (err, message) => {
                if (err) {
                    reject({ success: false });
                }
                else {
                    resolve({ success: true, message });
                }
            }
        );
    });
}

module.exports = {
    sendMessage
};
