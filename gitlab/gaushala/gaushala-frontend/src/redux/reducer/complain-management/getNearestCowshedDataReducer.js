import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  nearestCowshedData: [],
  msg: "",
};
export const getNearestCowshedDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_NEAREST_COWSHED_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_NEAREST_COWSHED_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        nearestCowshedData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.GET_NEAREST_COWSHED_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        nearestCowshedData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
