import { toast } from "react-toastify";
import { POST, DELETE, GET, PUT, PATCH } from "../../../../services/api";
import { adminTypes } from "../../../type/adminTypes";

export const bannerDataAction = (size, page, searchResult) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_BANNER_DATA_PENDING,
        isLoading: true,
      });
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const res = await GET(`admin/banner/?${pages}${sizes}${searchs}`);
      dispatch({
        type: adminTypes.GET_BANNER_DATA_SUCCESS,
        payload: res?.data.result.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
        count: res.data.result.count,
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_BANNER_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const deletebanner = (index, callback) => {
  return async (dispatch) => {
    try {
      const id = `bannerId=${index}`;
      const res = await DELETE(`admin/banner/?${id}`);
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

export const addbanner = (proData, callback) => {
  return async (dispatch) => {
    try {
      const datas = {
        banner: proData,
      };
      const res = await POST(`admin/banner`, datas);
      if (res?.data?.status_code === 201) {
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

export const bannerEditDetailsAction = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.EDIT_DETAILS_BANNER_DATA_PENDING,
        isLoading: true,
      });
      const id = `actRuleId=${_id}`;
      const res = await GET(`admin/banner/banner?${id}`);
      dispatch({
        type: adminTypes.EDIT_DETAILS_BANNER_DATA_SUCCESS,
        payload: res?.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.EDIT_DETAILS_BANNER_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const updatebanner = (_id, datas, callback) => {
  return async () => {
    const id = `bannerId=${_id}`;
    const banners = {
      banner: datas,
    };
    const res = await PUT(`admin/banner/?${id}`, banners);
    if (res?.data?.status_code === 200) {
      toast.success(res?.data?.message);
      callback(res);
    } else {
      toast.error(res?.data?.message);
    }
  };
};
