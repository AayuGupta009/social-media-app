import { toast } from "react-toastify";
import { POST, DELETE, GET, PUT, PATCH } from "../../../../services/api";
import { adminTypes } from "../../../type/adminTypes";

export const blogsDataAction = (size, page, searchResult) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_BLOGS_DATA_PENDING,
        isLoading: true,
      });
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const res = await GET(`admin/blog/?${pages}${sizes}${searchs}`);
      dispatch({
        type: adminTypes.GET_BLOGS_DATA_SUCCESS,
        payload: res?.data.result.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
        count: res.data.result.count,
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_BLOGS_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const deleteBlogs = (index, callback) => {
  return async (dispatch) => {
    try {
      const id = `blogId=${index}`;
      const res = await DELETE(`admin/blog/?${id}`);
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

export const addBlogs = (proData, callback) => {
  return async (dispatch) => {
    try {
      const datas = {
        image: proData.image,
        description: proData.description,
        title: proData.title,
      };
      const res = await POST(`admin/blog`, datas);
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

export const blogsEditDetailsAction = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.EDIT_DETAILS_BLOGS_DATA_PENDING,
        isLoading: true,
      });
      const id = `blogId=${_id}`;
      const res = await GET(`admin/blog/details/?${id}`);
      dispatch({
        type: adminTypes.EDIT_DETAILS_BLOGS_DATA_SUCCESS,
        payload: res?.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.EDIT_DETAILS_BLOGS_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const updateBlogs = (_id, datas, callback) => {
  return async () => {
    const id = `blogId=${_id}`;
    const res = await PUT(`admin/blog/?${id}`, datas);
    if (res?.data?.status_code === 200) {
      toast.success(res?.data?.message);
      callback(res);
    } else {
      toast.error(res?.data?.message);
    }
  };
};
