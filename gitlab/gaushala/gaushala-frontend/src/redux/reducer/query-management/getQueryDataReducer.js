import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  queryData: [],
  msg: "",
};
export const getQueryDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_QUERY_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_QUERY_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        queryData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.GET_QUERY_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        queryData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
