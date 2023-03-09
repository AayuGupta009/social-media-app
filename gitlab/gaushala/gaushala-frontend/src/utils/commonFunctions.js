import moment from "moment";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

import constants from "../constants";

export const changesISODateToNormal = (date) => {
  let newdate = date;
  let dates = new Date(date);
  let year = dates.getFullYear();
  let month = dates.getMonth() + 1;
  let dt = dates.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return `${dt}-${month}-${year}`;
};

export const formatDate = (date) => {
  return moment(date, "YYYY-MM-DDTHH:mm:ss.SSSZ").format("DD-MM-YYYY");
};

export const truncateDescription = (description) => {
  if (description?.length > 30) {
    return description.substring(0, 30) + "" + "...";
  }
  return description;
};

export const truncateTitle = (title) => {
  if (title?.length > 30) {
    return title.substring(0, 30) + "" + "...";
  }
  return title;
};

export const handleTextInput = (event, size) => {
  const value = event.target.value;
  if (value.length > size) {
    event.preventDefault();
    event.stopPropagation();
  }
};
export const onlyCharacters = (event) => {
  const regex = /^[A-Za-z]+$/;
  const key = String.fromCharCode(event.keyCode);
  if (!regex.test(key)) {
    event.preventDefault();
  }
};
// onKeyDown={onlyCharacters}
const getUniqueDeviceId = () => {
  let deviceId = localStorage.getItem("deviceId");

  if (!deviceId) {
    deviceId = uuid();
    localStorage.setItem("deviceId", deviceId);
  }

  return deviceId;
};

export default {
  getUniqueDeviceId,
};
