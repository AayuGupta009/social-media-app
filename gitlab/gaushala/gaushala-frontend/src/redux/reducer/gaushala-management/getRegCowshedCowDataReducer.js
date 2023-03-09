import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  cowshedCowData: [],
  msg: "",
};
export const getRegCowshedCowDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_REG_COWSHED_COW_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_REG_COWSHED_COW_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        cowshedCowData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.GET_REG_COWSHED_COW_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        cowshedCowData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
