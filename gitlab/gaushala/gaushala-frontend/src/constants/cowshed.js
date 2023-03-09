const count = {
  INCREASED: 1,
  DECREASED: -1,
};

const Point = "Point";
const allowedDomains = ["com", "net", "in"];

const statusForCowshed = "status";

const minValue = 1;

const maxValue = 10;

const cowshedType = {
  GOVERNMENT: 0,
  NON_GOVERNMENT: 1,
};

const cowshedTypeValue = {
  GOVERNMENT: "GOVERNMENT",
  NON_GOVERNMENT: "NON-GOVERNMENT",
};

const registrationStatus = { PENDING: 0, ACCEPTED: 1, REJECTED: 2 };

const registrationStatusValue = ["PENDING", "ACCEPTED", "REJECTED"];

const defaultSort = "createdAt";

const healthStatus = { HEALTHY: 0, UNHEALTHY: 1 };

const healthStatusValue = ["HEALTHY", "UNHEALTHY"];

const invalidFormat = "Invalid format";

const recordDateConstant = "recordDate";

const order = { ASC: 1, DESC: -1 };

const orderingKeys = {
  ASC: "ASC",
  DESC: "DESC",
};

const regexForDate = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;

const regexForTime = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

const regexForId = /^[a-f0-9]{24}$/;

const regexForMobile = /^\d{10}$/;

const regexForPanCard = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const regexForPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const requestMethod = { DELETE: 0, UPDATE: 1 };

const requestMethodValue = ["DELETE", "UPDATE"];

const applicationStatus = { PENDING: 0, IN_PROGRESS: 1, COMPLETED: 2 };

const applicationStatusValue = ["PENDING", "IN_PROGRESS", "COMPLETED"];

const year = { birthYear: 2000 };

module.exports = {
  count,
  statusForCowshed,
  allowedDomains,
  minValue,
  maxValue,
  cowshedType,
  recordDateConstant,
  cowshedTypeValue,
  registrationStatus,
  registrationStatusValue,
  defaultSort,
  healthStatus,
  healthStatusValue,
  invalidFormat,
  order,
  Point,
  orderingKeys,
  regexForDate,
  regexForTime,
  regexForId,
  regexForPassword,
  regexForMobile,
  regexForPanCard,
  requestMethod,
  requestMethodValue,
  applicationStatus,
  applicationStatusValue,
  year,
};
