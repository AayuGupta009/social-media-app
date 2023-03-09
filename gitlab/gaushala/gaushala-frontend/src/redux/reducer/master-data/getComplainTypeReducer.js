import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  complainTypeData: [],
  msg: "",
};
export const getComplainTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_COMPLAIN_TYPE_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_COMPLAIN_TYPE_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        complainTypeData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.GET_COMPLAIN_TYPE_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        complainTypeData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
