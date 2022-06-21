const User = require('models/user');
const { loggerToFile, loggerToConsole } = require('utils/logger');
const { getLoggingMethod } = require('utils/get-logging-method.js');
const { sendMessage } = require('services');
const cron = require('node-cron');
const _ = require('lodash');

cron.schedule('0 1 * * *', async () => {
   try {
      const usersList = await User.getByCardsToActivate();
      const chunks = _.chunk(usersList, 50);
      _.map(chunks, (users) => {
         const messagePromises = users.map(async (user) => {
            const phone = user.countryCode + user.phoneNumber;
            const message = `You need to activate your card to start using it`;
            await sendMessage(message, phone);
         });
         Promise.all(messagePromises);
      });
   }
   catch (err) {
      const logLevel = getLoggingMethod(err.status);
      loggerToConsole[logLevel](JSON.stringify(err));
      loggerToFile[logLevel](JSON.stringify(err));
   }
});
