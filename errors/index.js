const HttpStatus = require('http-status');
const commonErrors = require('./common');
const { GPS_ACTION_CODE } = require('./gps-action-codes');
const Exception = require('services/custom-exception');

const userNotFoundError = new Error('userNotFoundError');
userNotFoundError.status = HttpStatus.NOT_FOUND;

const conversionNotFoundError = new Error('conversionNotFoundError');
conversionNotFoundError.status = HttpStatus.NOT_FOUND;

const userExistsError = new Error('userExistsError');
userExistsError.status = HttpStatus.CONFLICT;

const invalidActivationKeyError = new Error('invalidActivationKeyError');
invalidActivationKeyError.status = HttpStatus.UNAUTHORIZED;

const otpExpiredOrWrongError = new Error('otpExpiredOrWrongError');
otpExpiredOrWrongError.status = HttpStatus.UNAUTHORIZED;

const noTokenProvided = new Error('noTokenProvided');
noTokenProvided.status = HttpStatus.UNAUTHORIZED;

const invalidToken = new Error('invalidToken');
invalidToken.status = HttpStatus.UNAUTHORIZED;

const sessionExpired = new Error('sessionExpired');
sessionExpired.status = HttpStatus.UNAUTHORIZED;

const forbiddenNationality = new Error('forbiddenNationality');
forbiddenNationality.status = HttpStatus.FORBIDDEN;

const forbiddenBusinessType = new Error('forbiddenBusinessType');
forbiddenBusinessType.status = HttpStatus.FORBIDDEN;

const forbiddenNatureOfBusiness = new Error('forbiddenNatureOfBusiness');
forbiddenNatureOfBusiness.status = HttpStatus.FORBIDDEN;

const gpsException = (errorCode) => new Exception(HttpStatus.BAD_REQUEST, GPS_ACTION_CODE[errorCode], errorCode);
gpsException.status = HttpStatus.BAD_REQUEST;

const badRequestError = (message) => new Exception(HttpStatus.BAD_REQUEST, message);
badRequestError.status = HttpStatus.BAD_REQUEST;

const rootCardAlreadyExistsError = (message) => new Exception(HttpStatus.BAD_REQUEST, message);
rootCardAlreadyExistsError.status = HttpStatus.BAD_REQUEST;

const userRootCardNotFoundError = new Error('userRootCardNotFoundError');
userRootCardNotFoundError.status = HttpStatus.NOT_FOUND;

const transactionsNotFoundError = new Error('transactionsNotFoundError');
transactionsNotFoundError.status = HttpStatus.NOT_FOUND;

const cardThemesNotFoundError = new Error('cardThemesNotFoundError');
cardThemesNotFoundError.status = HttpStatus.NOT_FOUND;

const reportNotFoundError = new Error('reportNotFoundError');
reportNotFoundError.status = HttpStatus.NOT_FOUND;


module.exports = {
    userNotFoundError,
    userExistsError,
    invalidActivationKeyError,
    otpExpiredOrWrongError,
    noTokenProvided,
    invalidToken,
    sessionExpired,
    commonErrors,
    forbiddenNationality,
    forbiddenBusinessType,
    forbiddenNatureOfBusiness,
    gpsException,
    conversionNotFoundError,
    badRequestError,
    rootCardAlreadyExistsError,
    userRootCardNotFoundError,
    transactionsNotFoundError,
    cardThemesNotFoundError
};
