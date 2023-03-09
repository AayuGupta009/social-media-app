import { GET, POST } from "../../../services/api";
import { adminTypes } from "../../type/adminTypes";

export const getFileDataAction = (types, fileTypes, fileData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_FILE_MASTER_DATA_PENDING,
        isLoading: true,
      });
      const type = `type=${types}&`;
      const fileType = `fileType=${fileTypes}`;
      const res = await POST(`common/upload/?${type}${fileType}`, fileData);
      dispatch({
        type: adminTypes.GET_FILE_MASTER_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
      return res;
    } catch (error) {
      dispatch({
        type: adminTypes.GET_FILE_MASTER_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const imageDataAction = (types, fileTypes, fileData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_IMAGE_MASTER_DATA_PENDING,
        isLoading: true,
      });
      const type = `type=${types}&`;
      const fileType = `fileType=${fileTypes}`;
      const res = await POST(`common/upload/?${type}${fileType}`, fileData);
      dispatch({
        type: adminTypes.GET_IMAGE_MASTER_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
      return res;
    } catch (error) {
      dispatch({
        type: adminTypes.GET_IMAGE_MASTER_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};
