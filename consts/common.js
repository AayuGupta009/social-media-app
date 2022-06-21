const TIMEZONE = {
    DUBAI: 'Asia/Dubai'
};
const ITEMS_PER_PAGE = 20;
const PAGE_SIZE = 10;

const SETTINGS = {
    expiresIn: '28d',
    OTP_EXPIRE: 2000 * 60,
    OTP_ATTEMPT_RESET_TIME: 2000,
    byPassOtp: 999888
};

const password_validation_regex = /^(?=.{8,})(?=.*[A-Z])(?=.*\d).*$/;

const iso_date_validation_regex = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/;


module.exports = {
    TIMEZONE,
    ITEMS_PER_PAGE,
    PAGE_SIZE,
    SETTINGS,
    password_validation_regex,
    iso_date_validation_regex
};
