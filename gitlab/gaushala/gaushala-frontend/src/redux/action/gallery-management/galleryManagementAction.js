import { toast } from "react-toastify";
import { POST, DELETE, GET, PUT, PATCH } from "../../../services/api";
import { adminTypes } from "../../type/adminTypes";

export const getGalleryData = (page, size) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_GALLERY_DATA_PENDING,
        isLoading: true,
      });
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const res = await GET(`/admin/gallery/?${pages}${sizes}`);
      dispatch({
        type: adminTypes.GET_GALLERY_DATA_SUCCESS,
        payload: res?.data.result.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
        count: res.data.result.count,
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_GALLERY_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const addGallery = (value, callback) => {
  return async () => {
    const values = {
      image: value,
    };
    const res = await POST(`admin/gallery`, values);
    if (res?.data?.status_code === 201) {
      toast.success(res?.data?.message);
      callback(res);
    } else {
      toast.error(res?.data?.message);
    }
  };
};
export const deleteGalleryData = (_id, callback) => {
  return async (dispatch) => {
    try {
      const id = `imageId=${_id}`;
      const res = await DELETE(`admin/gallery/?${id}`);
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