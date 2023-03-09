import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  complainData: [],
  msg: "",
};
export const getComplaintDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_COMPLAINT_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_COMPLAINT_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        complainData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.GET_COMPLAINT_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        complainData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
