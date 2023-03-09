import axios, { DELETE, GET, PUT } from "../../../services/api";
import { toast } from "react-toastify";
import { adminTypes } from "../../type/adminTypes";

export const getGaushalaManagementData = (cowshedPayload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_GAUSHALA_MANAGEMENT_DATA_PENDING,
        isLoading: true,
      });
      for (let key in cowshedPayload) {
        if (
          cowshedPayload[key] === "" ||
          cowshedPayload[key] === " " ||
          cowshedPayload[key] === []
        ) {
          delete cowshedPayload[key];
        }
      }
      const res = await GET(`admin/cowshed/list`, cowshedPayload);
      dispatch({
        type: adminTypes.GET_GAUSHALA_MANAGEMENT_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_GAUSHALA_MANAGEMENT_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const ViewGaushalApplicationForm = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_GAUSHALA_MANAGEMENT_DATA_PENDING,
        isLoading: true,
      });
      const id = `cowshedId=${_id}`;
      const res = await GET(`admin/cowshed/cowshed/?${id}`);
      dispatch({
        type: adminTypes.GET_GAUSHALA_MANAGEMENT_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_GAUSHALA_MANAGEMENT_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};
export const deleteCowshedRequest = (index, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.DELETE_COWSHED_REQUEST_DATA_PENDING,
        isLoading: true,
      });
      const id = `cowshedId=${index}`;
      const res = await DELETE(`admin/cowshed/cowshed/?${id}`);
      dispatch({
        type: adminTypes.DELETE_COWSHED_REQUEST_DATA_SUCCESS,
        payload: index ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
      if (res?.data?.status_code === 200) {
        toast.success(res?.data?.message);
        callback(res);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      dispatch({
        type: adminTypes.DELETE_COWSHED_REQUEST_DATA_FAILED,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const regCowshedCowData = (viewCowshedPayload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_REG_COWSHED_COW_DATA_PENDING,
        isLoading: true,
      });
      for (let key in viewCowshedPayload) {
        if (
          viewCowshedPayload[key] === "" ||
          viewCowshedPayload[key] === " " ||
          viewCowshedPayload[key] === []
        ) {
          delete viewCowshedPayload[key];
        }
      }
      const res = await GET(
        `admin/cowshed/cowshed/cow-list`,
        viewCowshedPayload
      );
      dispatch({
        type: adminTypes.GET_REG_COWSHED_COW_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_REG_COWSHED_COW_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const cowAdoptionReqData = (viewCowshedPayload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_COW_ADOP_REQ_DATA_PENDING,
        isLoading: true,
      });
      for (let key in viewCowshedPayload) {
        if (
          viewCowshedPayload[key] === "" ||
          viewCowshedPayload[key] === " " ||
          viewCowshedPayload[key] === []
        ) {
          delete viewCowshedPayload[key];
        }
      }
      const res = await GET(
        `admin/cowshed/cowshed/adopt-request-list`,
        viewCowshedPayload
      );
      dispatch({
        type: adminTypes.GET_COW_ADOP_REQ_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_COW_ADOP_REQ_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const deleteAdoptCowRequest = (index, cowId, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.DELETE_COWSHED_REQUEST_DATA_PENDING,
        isLoading: true,
      });
      const cowsId = `cowshedId=${cowId}`;
      const id = `requestId=${index}`;
      const res = await DELETE(
        `admin/cowshed/cowshed/adopt-request-list?${id}&${cowsId}`
      );
      dispatch({
        type: adminTypes.DELETE_COWSHED_REQUEST_DATA_SUCCESS,
        payload: index,
        isLoading: false,
        msg: res.data.message ?? "",
      });
      if (res?.data?.status_code === 200) {
        toast.success(res?.data?.message);
        callback(res);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      dispatch({
        type: adminTypes.DELETE_COWSHED_REQUEST_DATA_FAILED,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const ViewAdoptedCowDetail = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_GAUSHALA_MANAGEMENT_DATA_PENDING,
        isLoading: true,
      });
      const id = `applicationId=${_id}`;
      const res = await GET(
        `admin/cowshed/cowshed/cow-list/application/?${id}`
      );
      dispatch({
        type: adminTypes.GET_GAUSHALA_MANAGEMENT_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_GAUSHALA_MANAGEMENT_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const acceptApplication = (_id, callback) => {
  return async () => {
    const id = `cowshedId=${_id}`;
    const finalStatus = `status=1`;
    const res = await PUT(`admin/cowshed/approve/?${id}`, finalStatus);
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
    const id = `cowshedId=${_id}`;
    const reasonBox = {
      reason: reason,
      status: 2,
    };
    const res = await PUT(`admin/cowshed/approve/?${id}`, reasonBox);
    if (res?.data?.status_code === 200) {
      toast.success(res?.data?.message);
      callback();
    } else {
      toast.error(res?.data?.message);
    }
  };
};
