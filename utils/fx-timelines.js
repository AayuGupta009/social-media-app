
const cutoffTimelines = {
    CNY: { index: 1, time: '08:00' },
    THB: { index: 2, time: '08:00' },
    UGX: { index: 3, time: '08:00' },
    AUD: { index: 4, time: '13:00' },
    BHD: { index: 5, time: '13:00' },
    HKD: { index: 6, time: '13:00' },
    ILS: { index: 7, time: '13:00' },
    JPY: { index: 8, time: '13:00' },
    KES: { index: 9, time: '13:00' },
    KWD: { index: 10, time: '13:00' },
    NZD: { index: 11, time: '13:00' },
    OMR: { index: 12, time: '13:00' },
    QAR: { index: 13, time: '13:00' },
    SAR: { index: 14, time: '13:00' },
    SGD: { index: 15, time: '13:00' },
    AED: { index: 16, time: '13:00' },
    HRK: { index: 17, time: '15:00' },
    BGN: { index: 18, time: '15:30' },
    INR: { index: 19, time: '16:30' },
    IDR: { index: 20, time: '16:30' },
    MYR: { index: 21, time: '16:30' },
    PHP: { index: 22, time: '16:30' },
    CZK: { index: 23, time: '08:00' },
    HUF: { index: 24, time: '08:00' },
    MXN: { index: 25, time: '08:00' },
    RON: { index: 26, time: '08:00' },
    RUB: { index: 27, time: '08:00' },
    PLN: { index: 28, time: '08:30' },
    PRY: { index: 29, time: '08:30' },
    DKK: { index: 30, time: '09:30' },
    NOK: { index: 31, time: '09:30' },
    ZAR: { index: 32, time: '09:30' },
    SEK: { index: 33, time: '09:30' },
    CHF: { index: 34, time: '09:30' },
    CAD: { index: 35, time: '13:00' },
    EUR: { index: 36, time: '13:50' },
    GBP: { index: 37, time: '14:20' },
    USD: { index: 38, time: '15:50' },
};

const getTimelineByCurrency = (currency) => cutoffTimelines[currency];

const sourceAccount = {
    id: '96a21f9f-231c-417a-9767-958432c55354',
    account_name: 'InCard'
};

const contactEmailAddress = 'currencycloud@incard.co';

module.exports = {
    getTimelineByCurrency,
    sourceAccount,
    contactEmailAddress
};
