import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  dashboardData: [],
  msg: "",
};
export const getDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_DASHBOARD_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        dashboardData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.GET_DASHBOARD_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        dashboardData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
