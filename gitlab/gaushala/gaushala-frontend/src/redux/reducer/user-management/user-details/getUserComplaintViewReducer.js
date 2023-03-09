import { adminTypes } from "../../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  userCompData: [],
  msg: "",
};
export const getUserComplaintViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_USER_DETAILS_VIEW_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_USER_DETAILS_VIEW_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        userCompData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.GET_USER_DETAILS_VIEW_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        userCompData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
