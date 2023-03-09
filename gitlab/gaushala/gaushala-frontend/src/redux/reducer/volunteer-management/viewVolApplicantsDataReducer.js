import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  viewData: [],
  msg: "",
};
export const viewVolApplicantsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.VIEW_VOLUNTEER_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.VIEW_VOLUNTEER_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        viewData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.VIEW_VOLUNTEER_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        viewData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
