import { toast } from "react-toastify";
import { POST, DELETE, GET, PUT, PATCH } from "../../../../services/api";
import { adminTypes } from "../../../type/adminTypes";

export const faqDataAction = (size, page, searchResult) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_FAQ_DATA_PENDING,
        isLoading: true,
      });
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const res = await GET(`admin/cms/faq?${pages}${sizes}${searchs}`);
      dispatch({
        type: adminTypes.GET_FAQ_DATA_SUCCESS,
        payload: res?.data.result.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
        count: res.data.result.count,
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_FAQ_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const deleteFaq = (index, callback) => {
  return async (dispatch) => {
    try {
      const status = {
        isDeleted: true,
      };
      const id = `faqId=${index}`;
      const res = await PUT(`admin/cms/faq/?${id}`, status);
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

export const addFaq = (proData, callback) => {
  return async (dispatch) => {
    try {
      const datas = {
        ...proData,
        document: proData.image,
      };
      const res = await POST(`admin/cms/faq`, datas);
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

export const faqEditDetailsAction = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.EDIT_DETAILS_FAQ_DATA_PENDING,
        isLoading: true,
      });
      const id = `faqId=${_id}`;
      const res = await GET(`admin/cms/faq/details?${id}`);
      dispatch({
        type: adminTypes.EDIT_DETAILS_FAQ_DATA_SUCCESS,
        payload: res?.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.EDIT_DETAILS_FAQ_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const updateFaq = (_id, datas, callback) => {
  return async () => {
    const id = `faqId=${_id}`;
    const res = await PUT(`admin/cms/faq?${id}`, datas);
    if (res?.data?.status_code === 200) {
      toast.success(res?.data?.message);
      callback(res);
    } else {
      toast.error(res?.data?.message);
    }
  };
};
