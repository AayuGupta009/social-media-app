import { toast } from "react-toastify";
import { DELETE, GET } from "../../../services/api";
import { adminTypes } from "../../type/adminTypes";

export const userDataAction = (size, page, searchResult) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_USER_DATA_PENDING,
        isLoading: true,
      });
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const res = await GET(`admin/user/?${pages}${sizes}${searchs}`);
      dispatch({
        type: adminTypes.GET_USER_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_USER_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const deleteUser = (index, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.DELETE_USER_DATA_PENDING,
        isLoading: true,
      });
      const id = `userId=${index}`;
      const res = await DELETE(`admin/user/?${id}`);
      dispatch({
        type: adminTypes.DELETE_USER_DATA_SUCCESS,
        payload: res.data ?? [],
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
        type: adminTypes.DELETE_USER_DATA_FAILED,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};
