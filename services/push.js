const apn = require('apn');

// //Live keys for push
const options = {
    token: {
        key: `${__dirname}/AuthKey_KNAS7N5L8V.p8`,
        keyId: 'KNAS7N5L8V',
        teamId: '92764M99CQ'
    },
    production: false
};

const apnProvider = new apn.Provider(options);

module.exports = {

    sendIosPush (deviceToken, pushMessage, pushType, badge, data, title = 'Incard - Card Limit') {
        const note = new apn.Notification();
        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        note.badge = badge;
        note.sound = 'ping.aiff';
        note.alert = pushMessage;
        note.topic = 'com.incard';
        note.payload = {
            title,
            body: pushMessage,
            pushType,
            data,
            image: data.image ? data.image : ''
        };
        apnProvider.send(note, deviceToken).then((result) => {
            console.log('IOS Push result', result);
            console.log('IOS Push failed Responce', result.failed);
        });
    }
};
