import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  viewData: [],
  msg: "",
};
export const viewAdoptedCowDetailData = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_GAUSHALA_MANAGEMENT_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_GAUSHALA_MANAGEMENT_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        viewData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.GET_GAUSHALA_MANAGEMENT_DATA_FAILED:
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
