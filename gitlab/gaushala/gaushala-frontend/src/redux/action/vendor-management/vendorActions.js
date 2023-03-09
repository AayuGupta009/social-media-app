import { toast } from "react-toastify";
import { POST, DELETE, GET, PUT, PATCH } from "../../../services/api";
import store from "../../store";
import { adminTypes } from "../../type/adminTypes";

export const venReqListAction = (size, page, searchResult, selectedValue) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_VENDOR_DATA_PENDING,
        isLoading: true,
      });
      const type = selectedValue
        ? selectedValue === 1
          ? `type=true`
          : `type=false`
        : "";
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const res = await GET(
        `admin/merchant-requirement/list/?${pages}${sizes}${searchs}${type}`
      );
      dispatch({
        type: adminTypes.GET_VENDOR_DATA_SUCCESS,
        payload: res?.data.result.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
        count: res?.data.result.count,
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_VENDOR_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const deleteVenNeed = (_id, callback) => {
  return async (dispatch) => {
    const status = {
      isDeleted: true,
    };
    const id = `requirementId=${_id}`;
    const res = await PUT(`admin/merchant-requirement/?${id}`, status);
    if (res?.data?.status_code === 200) {
      toast.success(res?.data?.message);
      callback(res);
    } else {
      toast.error(res?.data?.message);
    }
  };
};

export const venApplicantsListAction = (
  size,
  page,
  searchResult,
  requirementId
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_VENDOR_DATA_PENDING,
        isLoading: true,
      });
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const id = `requirementId=${requirementId}`;
      const res = await GET(
        `admin/merchant-requirement/application/?${pages}${sizes}${searchs}${id}`
      );
      dispatch({
        type: adminTypes.GET_VENDOR_DATA_SUCCESS,
        payload: res?.data.result.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
        count: res.data.result.count,
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_VENDOR_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const deleteVenApplicant = (_id, callback) => {
  return async (dispatch) => {
    const id = `requirementId=${_id}`;
    const res = await DELETE(`admin/merchant-requirement/application/?${id}`);
    if (res?.data?.status_code === 200) {
      toast.success(res?.data?.message);
      callback(res);
    } else {
      toast.error(res?.data?.message);
    }
  };
};

export const viewVenApplicantsDataAction = (reId, _id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.VIEW_VENDOR_DATA_PENDING,
        isLoading: true,
      });
      const reqId = `requirementId=${reId}`;
      const id = `applicationId=${_id}&`;
      const res = await GET(
        `admin/merchant-requirement/application/view/?${id}${reqId}`
      );
      dispatch({
        type: adminTypes.VIEW_VENDOR_DATA_SUCCESS,
        payload: res?.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.VIEW_VENDOR_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const addVendor = (values, callback) => {
  return async () => {
    const users = {
      cowshedId: values.cowshed,
      description: values.description,
      title: values.title,
      document: values.file,
    };
    const res = await POST(`admin/merchant-requirement`, users);
    if (res?.data?.status_code === 201) {
      toast.success(res?.data?.message);
      callback();
    } else {
      toast.error(res?.data?.message);
    }
  };
};

export const getVenEditDetailsAction = (reId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.EDIT_DETAILS_VENDOR_DATA_PENDING,
        isLoading: true,
      });
      const reqId = `requirementId=${reId}`;
      const res = await GET(`admin/merchant-requirement/requirement/?${reqId}`);
      dispatch({
        type: adminTypes.EDIT_DETAILS_VENDOR_DATA_SUCCESS,
        payload: res?.data.result ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.EDIT_DETAILS_VENDOR_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const updateVendor = (_id, datas, callback) => {
  return async () => {
    const id = `requirementId=${_id}`;
    const res = await PUT(`admin/merchant-requirement/?${id}`, datas);
    if (res?.data?.status_code === 200) {
      toast.success(res?.data?.message);
      callback(res);
    } else {
      toast.error(res?.data?.message);
    }
  };
};
