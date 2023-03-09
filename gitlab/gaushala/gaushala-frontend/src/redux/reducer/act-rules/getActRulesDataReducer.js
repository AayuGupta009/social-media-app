import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  actRulesData: [],
  msg: "",
  count: "",
};
export const getActRulesDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_ACT_RULES_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_ACT_RULES_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        actRulesData: action.payload,
        isLoading: false,
        msg: action.msg,
        count: action.count,
      };
    case adminTypes.GET_ACT_RULES_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        actRulesData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
