const { LOCALES_BY_KEY, DEFAULT_LOCALE } = require('swan-shared-be-repo').constants;

const englishLocale = require('./en');
const arabicLocale = require('./ar');


module.exports = {
    [ LOCALES_BY_KEY.English ]: englishLocale,
    [ LOCALES_BY_KEY.Arabic ]: arabicLocale,

    DEFAULT_LOCALE
};
