const { env } = require('../constant/environment');

const userType = {
  USER: 0,
  COWSHED: 1,
  ADMIN: 2
};

const wrongOtp = `Otp should be of ${env.OTP_DIGIT} digits`;

const wrongPassword = 'Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.';

const defaultDevice = 'web';

const tokenType = { 'LOGIN': 1, 'VERIFICATION': 2 };

const defaultSort = 'createdAt';

const userTypeValue = ['USER', 'COWSHED', 'ADMIN'];

const userStatus = {
  BLOCK: 0,
  UNBLOCK: 1
};

const userStatusValue = ['BLOCK', 'UNBLOCK'];

const gender = { MALE: 0, FEMALE: 1 };

const genderValue = ['MALE', 'FEMALE'];

const applicationStatus = { PENDING: 0, IN_PROGRESS: 1, COMPLETED: 2 };

const applicationStatusValue = ['PENDING', 'IN-PROGRESS', 'COMPLETED'];

const errorMsg = {
  EXPIRED: 'jwt expired',
  INVALID: 'invalid signature'
};

const logoutMessage = ['LOGOUT_SUCCESSFUL', 'COWSHED_LOGOUT_SUCCESSFUL', 'ADMIN_LOGOUT_SUCCESSFUL'];

module.exports = {
  userType,
  userTypeValue,
  wrongOtp,
  wrongPassword,
  tokenType,
  defaultDevice,
  applicationStatus,
  applicationStatusValue,
  gender,
  genderValue,
  logoutMessage,
  defaultSort,
  userStatus,
  userStatusValue,
  errorMsg
};
