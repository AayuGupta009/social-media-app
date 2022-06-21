const HttpStatus = require('http-status');

const noAccessRights = new Error('noAccessRights');
noAccessRights.status = HttpStatus.UNAUTHORIZED;

const notAllowedCorsError = new Error('notAllowedCorsError');
notAllowedCorsError.status = HttpStatus.UNAUTHORIZED;

const storeIdMissedError = new Error('storeIdMissedError');
storeIdMissedError.status = HttpStatus.BAD_REQUEST;

const csvImportFilesOnlyError = new Error('csvImportFilesOnlyError');
csvImportFilesOnlyError.status = HttpStatus.BAD_REQUEST;

const idIsNotValidError = new Error('idIsNotValidError');
idIsNotValidError.status = HttpStatus.BAD_REQUEST;

const zeroRecordsParsedError = new Error('zeroRecordsParsedError');
zeroRecordsParsedError.status = HttpStatus.BAD_REQUEST;


module.exports = {
    noAccessRights,
    notAllowedCorsError,
    storeIdMissedError,
    csvImportFilesOnlyError,
    idIsNotValidError,
    zeroRecordsParsedError
};
