import { toast } from "react-toastify";
import { POST, DELETE, GET, PUT, PATCH } from "../../../services/api";
import store from "../../store";
import { adminTypes } from "../../type/adminTypes";

export const volunteerReqListAction = (
  size,
  page,
  searchResult,
  selectedValue
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_VOLUNTEER_DATA_PENDING,
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
        `admin/volunteer-requirement/list/?${pages}${sizes}${searchs}${type}`
      );
      dispatch({
        type: adminTypes.GET_VOLUNTEER_DATA_SUCCESS,
        payload: res?.data.result.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
        count: res.data.result.count,
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_VOLUNTEER_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const deleteVolNeed = (_id, callback) => {
  return async (dispatch) => {
    try {
      const status = {
        isDeleted: true,
      };
      const id = `requirementId=${_id}`;
      const res = await PUT(`admin/volunteer-requirement/?${id}`, status);
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

export const volunteerApplicantsListAction = (
  size,
  page,
  searchResult,
  requirementId
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_VOLUNTEER_DATA_PENDING,
        isLoading: true,
      });
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const id = `requirementId=${requirementId}`;
      const res = await GET(
        `admin/volunteer-requirement/application/?${pages}${sizes}${searchs}${id}`
      );
      dispatch({
        type: adminTypes.GET_VOLUNTEER_DATA_SUCCESS,
        payload: res?.data.result.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
        count: res.data.result.count,
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_VOLUNTEER_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const deleteVolApplicant = (_id, callback) => {
  return async (dispatch) => {
    try {
      const id = `requirementId=${_id}`;
      const res = await DELETE(`admin/volunteer-requirement/application?${id}`);
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

export const viewVolApplicantsDataAction = (reId, _id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.VIEW_VOLUNTEER_DATA_PENDING,
        isLoading: true,
      });
      const reqId = `requirementId=${reId}`;
      const id = `applicationId=${_id}&`;
      const res = await GET(
        `admin/volunteer-requirement/application/view/?${id}${reqId}`
      );
      dispatch({
        type: adminTypes.VIEW_VOLUNTEER_DATA_SUCCESS,
        payload: res?.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.VIEW_VOLUNTEER_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const addVolunteer = (values, callback) => {
  return async () => {
    const users = {
      cowshedId: values.cowshed,
      description: values.description,
      title: values.title,
      document: values.document,
    };
    const res = await POST(`admin/volunteer-requirement`, users);
    if (res?.data?.status_code === 201) {
      toast.success(res?.data?.message);
      callback();
    } else {
      toast.error(res?.data?.message);
    }
  };
};

export const getVolEditDetailsAction = (reId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.EDIT_DETAILS_VOLUNTEER_DATA_PENDING,
        isLoading: true,
      });
      const reqId = `requirementId=${reId}`;
      const res = await GET(
        `admin/volunteer-requirement/requirement/?${reqId}`
      );
      dispatch({
        type: adminTypes.EDIT_DETAILS_VOLUNTEER_DATA_SUCCESS,
        payload: res?.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.EDIT_DETAILS_VOLUNTEER_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const updateVolunteer = (_id, datas, callback) => {
  return async () => {
    const id = `requirementId=${_id}`;
    const res = await PUT(`admin/volunteer-requirement/?${id}`, datas);
    if (res?.data?.status_code === 200) {
      toast.success(res?.data?.message);
      callback(res);
    } else {
      toast.error(res?.data?.message);
    }
  };
};
