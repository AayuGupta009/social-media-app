import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  gaushalaData: [],
  msg: "",
};
export const getGaushalaManagementReducer = (state = initialState, action) => {
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
        gaushalaData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.GET_GAUSHALA_MANAGEMENT_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        gaushalaData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
export const deleteCowshedRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.DELETE_COWSHED_REQUEST_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.DELETE_COWSHED_REQUEST_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        gaushalaData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.DELETE_COWSHED_REQUEST_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        gaushalaData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};