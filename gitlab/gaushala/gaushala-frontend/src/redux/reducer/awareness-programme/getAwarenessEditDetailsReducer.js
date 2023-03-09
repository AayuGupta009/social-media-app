import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  editDetails: [],
  msg: "",
};
export const getAwarenessEditDetailsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case adminTypes.EDIT_DETAILS_AWARENESS_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.EDIT_DETAILS_AWARENESS_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        editDetails: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.EDIT_DETAILS_AWARENESS_DATA_FAILED:
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
