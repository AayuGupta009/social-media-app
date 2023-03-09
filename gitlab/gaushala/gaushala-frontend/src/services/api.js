import axios from "axios";
import { logout } from "../redux/action/auth/authAction";
import { setLoading } from "../redux/action/loading/loadingActions";
import store from "../redux/store";
import i18n from "i18next";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,

  headers: {
    "x-api-key": process.env.REACT_APP_API_KEY,
    "Accept-Language": i18n.language === "hi" ? "hi" : "en",
  },
});

// export const updateLanguageHeader = (language) => {
//   axiosInstance.defaults.headers["Accept-Language"] =
//     language === "hi" ? "hn" : "en";
// };

axiosInstance.interceptors.request.use(
  function configuration(config) {
    store.dispatch(setLoading(true));
    config.headers["Accept-Language"] = i18n.language === "hi" ? "hi" : "en";
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async function (result) {
    store.dispatch(setLoading(false));
    if (
      result.data.status_code === 401 ||
      result.data.type === "SESSION_EXPIRED"
    ) {
      logout();
    }
    return result;
  },
  function (error) {
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

export const GET = async (url, params) => {
  try {
    let result = await axiosInstance.get(url, { params: params });
    return result;
  } catch (error) {
    return error?.response;
  }
};

export const DELETE = async (url, params, data) => {
  try {
    let result = await axiosInstance.delete(url, { params, data });
    return result;
  } catch (error) {
    return error?.response;
  }
};

export const POST = async (url, body, options) => {
  try {
    let result = await axiosInstance.post(url, body, options);
    return result;
  } catch (error) {
    return error?.response;
  }
};

export const PUT = async (url, body, options) => {
  try {
    let result = await axiosInstance.put(url, body, options);
    return result;
  } catch (error) {
    return error?.response;
  }
};

export const PATCH = async (url, body, options) => {
  try {
    let result = await axiosInstance.patch(url, body, options);
    return result;
  } catch (error) {
    return error?.response;
  }
};

export { axiosInstance };
