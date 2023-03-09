import axios, { DELETE, GET, PUT } from "../../../services/api";
import { toast } from "react-toastify";
import { adminTypes } from "../../type/adminTypes";

export const getNgoManagementData = (
  value,
  size,
  page,
  searchResult,
  cityId
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_NGO_DATA_PENDING,
        isLoading: true,
      });
      const id = cityId ? `districtId=${cityId}&` : "";
      const types = value === 0 ? `type=1` : `type=0`;
      const sizes = size ? `size=${size ?? 10}&` : "";
      const pages = page ? `page=${page ?? 1}&` : "";
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const res = await GET(
        `admin/ngo/?${types}&${id}${pages}${sizes}${searchs}`
      );
      dispatch({
        type: adminTypes.GET_NGO_DATA_SUCCESS,
        payload: res?.data.result.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
        count: res.data.result.count,
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_NGO_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const ViewNgoApplicationFormDetails = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_VIEW_NGO_DATA_PENDING,
        isLoading: true,
      });
      const id = `ngoId=${_id}`;
      const res = await GET(`admin/ngo/details/?${id}`);
      dispatch({
        type: adminTypes.GET_VIEW_NGO_DATA_SUCCESS,
        payload: res?.data.result ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_VIEW_NGO_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};
export const deleteRegNgo = (_id, callback) => {
  return async (dispatch) => {
    try {
      const status = {
        isDeleted: true,
      };
      const id = `ngoId=${_id}`;
      const res = await PUT(`admin/ngo/?${id}`, status);
      if (res?.data?.status_code === 200) {
        toast.success(res?.data?.message);
        callback(res);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
};
export const acceptApplication = (_id, callback) => {
  return async () => {
    const id = `ngoId=${_id}`;
    const finalStatus = `status=1`;
    const res = await PUT(`admin/ngo/?${id}`, finalStatus);
    if (res?.data?.status_code === 200) {
      toast.success(res?.data?.message);
      callback();
    } else {
      toast.error(res?.data?.message);
    }
  };
};

export const rejectApplication = (_id, reason, callback) => {
  return async () => {
    const id = `ngoId=${_id}`;
    const reasonBox = {
      reason: reason,
      status: 2,
    };
    const res = await PUT(`admin/ngo/?${id}`, reasonBox);
    if (res?.data?.status_code === 200) {
      toast.success(res?.data?.message);
      callback(res);
    } else {
      toast.error(res?.data?.message);
    }
  };
};
