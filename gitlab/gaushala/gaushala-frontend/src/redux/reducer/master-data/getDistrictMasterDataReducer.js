import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  districtData: [],
  msg: "",
};
export const getDistrictMasterDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_DISTRICT_MASTER_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_DISTRICT_MASTER_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        districtData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.GET_DISTRICT_MASTER_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        districtData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
