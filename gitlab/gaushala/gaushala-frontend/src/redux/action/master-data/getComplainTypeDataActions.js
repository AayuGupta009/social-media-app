import { GET } from "../../../services/api";
import { adminTypes } from "../../type/adminTypes";

export const getComplainTypeDataActions = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_COMPLAIN_TYPE_DATA_PENDING,
        isLoading: true,
      });
      const res = await GET(`master/list/complaint-type`);
      dispatch({
        type: adminTypes.GET_COMPLAIN_TYPE_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_COMPLAIN_TYPE_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};
