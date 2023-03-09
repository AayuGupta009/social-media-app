import { toast } from "react-toastify";
import { POST, DELETE, GET, PUT, PATCH } from "../../../../services/api";
import { adminTypes } from "../../../type/adminTypes";

export const newsDataAction = (size, page, searchResult) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_NEWS_DATA_PENDING,
        isLoading: true,
      });
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const res = await GET(`admin/news/?${pages}${sizes}${searchs}`);
      dispatch({
        type: adminTypes.GET_NEWS_DATA_SUCCESS,
        payload: res?.data.result.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
        count: res.data.result.count,
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_NEWS_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const deleteNews = (index, callback) => {
  return async (dispatch) => {
    try {
      const id = `newsId=${index}`;
      const res = await DELETE(`admin/news/?${id}`);
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

export const addNews = (proData, callback) => {
  return async (dispatch) => {
    try {
      const datas = {
        ...proData,
        document: proData.image,
      };
      const res = await POST(`admin/news`, datas);
      if (res?.data?.status_code === 201) {
        toast.success(res?.data?.message);
        callback();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
};

export const newsEditDetailsAction = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.EDIT_DETAILS_NEWS_DATA_PENDING,
        isLoading: true,
      });
      const id = `newsId=${_id}`;
      const res = await GET(`admin/news/details/?${id}`);
      dispatch({
        type: adminTypes.EDIT_DETAILS_NEWS_DATA_SUCCESS,
        payload: res?.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.EDIT_DETAILS_NEWS_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const updateNews = (_id, datas, callback) => {
  return async () => {
    const id = `newsId=${_id}`;
    const res = await PUT(`admin/news/?${id}`, datas);
    if (res?.data?.status_code === 200) {
      toast.success(res?.data?.message);
      callback(res);
    } else {
      toast.error(res?.data?.message);
    }
  };
};
