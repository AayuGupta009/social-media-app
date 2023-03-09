import { toast } from "react-toastify";
import { POST, DELETE, GET, PUT, PATCH } from "../../../services/api";
import { adminTypes } from "../../type/adminTypes";

export const programmeDataAction = (size, page, searchResult) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_AWARENESS_PROG_DATA_PENDING,
        isLoading: true,
      });
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const res = await GET(
        `admin/awareness-program/?${pages}${sizes}${searchs}`
      );
      dispatch({
        type: adminTypes.GET_AWARENESS_PROG_DATA_SUCCESS,
        payload: res?.data.result.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
        count: res.data.result.count,
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_AWARENESS_PROG_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const deleteProgramme = (index, callback) => {
  return async (dispatch) => {
    try {
      const status = {
        isDeleted: true,
      };
      const id = `programId=${index}`;
      const res = await PUT(`admin/awareness-program/?${id}`, status);
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

export const addProgramme = (proData, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.ADD_AWARENESS_PROGRAMME_PENDING,
        isLoading: true,
      });
      const timestamp = proData.eventTime;
      const time = new Date(timestamp).toLocaleTimeString();
      const datas = {
        title: proData.title,
        image: proData.image,
        document: proData.document,
        eventDate: proData.eventDate,
        eventTime: time.slice(0, 5),
      };
      const res = await POST(`admin/awareness-program`, datas);
      if (res?.data?.status_code === 201) {
        dispatch({
          type: adminTypes.ADD_AWARENESS_PROGRAMME_SUCCESS,
          payload: res.data ?? [],
          isLoading: false,
          msg: res.data.message ?? "",
        });
        toast.success(res?.data?.message);
        callback();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      dispatch({
        type: adminTypes.ADD_AWARENESS_PROGRAMME_FAILED,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const awarenessEditDetailsAction = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.EDIT_DETAILS_AWARENESS_DATA_PENDING,
        isLoading: true,
      });
      const id = `programId=${_id}`;
      const res = await GET(`admin/awareness-program/program?${id}`);
      dispatch({
        type: adminTypes.EDIT_DETAILS_AWARENESS_DATA_SUCCESS,
        payload: res?.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.EDIT_DETAILS_AWARENESS_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const updateProgramme = (_id, datas, callback) => {
  return async () => {
    const id = `programId=${_id}`;
    const res = await PUT(`admin/awareness-program/?${id}`, datas);
    if (res?.data?.status_code === 200) {
      toast.success(res?.data?.message);
      callback(res);
    } else {
      toast.error(res?.data?.message);
    }
  };
};
