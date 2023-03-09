import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  adoptedCowData: [],
  msg: "",
};
export const getCowAdoptionReqReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_COW_ADOP_REQ_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_COW_ADOP_REQ_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        adoptedCowData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.GET_COW_ADOP_REQ_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        adoptedCowData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
