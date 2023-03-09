import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  editDetails: [],
  msg: "",
};
export const getEditDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.EDIT_DETAILS_VOLUNTEER_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.EDIT_DETAILS_VOLUNTEER_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        editDetails: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.EDIT_DETAILS_VOLUNTEER_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        editDetails: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
