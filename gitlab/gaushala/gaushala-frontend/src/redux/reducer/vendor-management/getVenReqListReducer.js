import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  venReqData: [],
  msg: "",
  count: "",
};
export const getVenReqListReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_VENDOR_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_VENDOR_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        venReqData: action.payload,
        isLoading: false,
        msg: action.msg,
        count: action.count,
      };
    case adminTypes.GET_VENDOR_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        venReqData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
