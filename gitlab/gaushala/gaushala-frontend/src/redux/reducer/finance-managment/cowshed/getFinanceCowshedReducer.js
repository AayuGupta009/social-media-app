import { adminTypes } from "../../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  financeCowshedData: [],
  msg: "",
  count: "",
};
export const getFinanceCowshedReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_FINANCE_DONATION_AMNT_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_FINANCE_DONATION_AMNT_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        financeCowshedData: action.payload,
        isLoading: false,
        msg: action.msg,
        count: action.count,
      };
    case adminTypes.GET_FINANCE_DONATION_AMNT_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        financeCowshedData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
