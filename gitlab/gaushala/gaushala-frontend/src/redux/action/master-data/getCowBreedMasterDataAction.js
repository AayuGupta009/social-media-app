import { GET } from "../../../services/api";
import { adminTypes } from "../../type/adminTypes";

export const getCowBreedMasterDataAction = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_COWBREED_MASTER_DATA_PENDING,
        isLoading: true,
      });
      const res = await GET(`master/list/cow-breed`);
      dispatch({
        type: adminTypes.GET_COWBREED_MASTER_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_COWBREED_MASTER_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};
