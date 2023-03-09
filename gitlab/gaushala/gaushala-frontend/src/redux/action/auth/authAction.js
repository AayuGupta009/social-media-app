import { authTypes } from "../../type/auth/auth";
import axios, { POST } from "../../../services/api";
import { DeviceUUID } from "device-uuid";
import { toast } from "react-toastify";
import getUniqueDeviceId from "../../../utils/commonFunctions";

export const adminLogin = (user, callback, callBackError) => {
  return async (dispatch) => {
    user.deviceToken = "chbdxjbkjsfdfd" + getUniqueDeviceId.getUniqueDeviceId();
    user.deviceId = getUniqueDeviceId.getUniqueDeviceId();
    user.deviceType = "Web";
    try {
      dispatch({
        type: authTypes.POST_SIGN_ADMIN_PENDING,
      });
      const res = await POST("admin/auth/login", user);
      if (res?.data?.status_code === 200) {
        localStorage.setItem("ACCESS_TOKEN", res.data.result.token);
        localStorage.setItem("EMAIL", res.data.result.email);
        dispatch({
          type: authTypes.POST_SIGN_ADMIN_SUCCESS,
          payload: res.data.result,
        });
        toast.success(res?.data?.message);
        callback();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      // callBackError(res);
    }
  };
};

export const forgotPwd = (data, callback, callBackError) => {
  return async () => {
    const email = {
      email: data.email,
    };
    const res = await POST("admin/auth/forgot-password", email);
    if (res?.data?.status_code === 200) {
      localStorage.setItem("RESET_TOKEN", res.data.result.token);
      toast.success(res?.data?.message);
      // callback();
    } else {
      toast.error(res?.data?.message);
    }
  };
};

export const resetPassword = (data, callback, callBackError) => {
  return async () => {
    const newPassword = data.password;
    const datas = {
      newPassword: newPassword,
    };
    const token = localStorage.getItem("RESET_TOKEN");
    const res = await POST("admin/auth/reset-password", datas);
    if (res?.data?.status_code === 201) {
      toast.success(res?.data?.message);
      callback();
    } else {
      toast.error(res?.data?.message);
    }
  };
};

export const logout = () => {
  return async () => {
    const res = await POST("admin/auth/logout");
    toast.success(res?.data?.message);
    localStorage.removeItem("ACCESS_TOKEN");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
};
