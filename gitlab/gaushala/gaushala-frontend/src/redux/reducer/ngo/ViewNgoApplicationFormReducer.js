import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  viewNgoData: [],
  msg: "",
  count: "",
};
export const ViewNgoApplicationFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_VIEW_NGO_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_VIEW_NGO_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        viewNgoData: action.payload,
        isLoading: false,
        msg: action.msg,
        count: action.count,
      };
    case adminTypes.GET_VIEW_NGO_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        viewNgoData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
