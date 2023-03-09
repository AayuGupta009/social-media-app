import { toast } from "react-toastify";
import { POST, DELETE, GET, PUT, PATCH } from "../../../services/api";
import { adminTypes } from "../../type/adminTypes";

export const nearestCowshedData = (complainID) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_NEAREST_COWSHED_DATA_PENDING,
        isLoading: true,
      });
      const id = `complaintId=${complainID}`;
      const res = await GET(`admin/complaint/nearest-cowshed/?${id}`);
      dispatch({
        type: adminTypes.GET_NEAREST_COWSHED_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_NEAREST_COWSHED_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const getComplaintData = (
  size,
  page,
  searchResult,
  selectedValue,
  cityId
) => {
  console.log(selectedValue, "selectedValue");
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_COMPLAINT_DATA_PENDING,
        isLoading: true,
      });
      const complaintType = cityId ? `complaintType=${cityId}&` : "";
      let type;
      if (selectedValue === 0) {
        type = "type=0";
      } else if (selectedValue === 1) {
        type = "type=1";
      } else if (selectedValue === 2) {
        type = "type=2";
      }
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const res = await GET(
        `/admin/complaint/list/?${pages}${sizes}${searchs}${
          type ?? ""
        }${complaintType}`
      );
      dispatch({
        type: adminTypes.GET_COMPLAINT_DATA_SUCCESS,
        payload: res?.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_COMPLAINT_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const deleteComplaint = (index, callback) => {
  return async (dispatch) => {
    try {
      const id = `complaintId=${index}`;
      const res = await DELETE(`admin/complaint/?${id}`);
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
export const updateNearestData = (complainID, userID, callback) => {
  return async (dispatch) => {
    const c_id = `complaintId=${complainID}`;
    const u_id = `cowshedId=${userID}`;
    const res = await PATCH(`admin/complaint/list/?${c_id}&${u_id}`);
    if (res?.data?.status_code === 200) {
      toast.success(res?.data?.message);
      callback();
    } else {
      toast.error(res?.data?.message);
    }
  };
};
