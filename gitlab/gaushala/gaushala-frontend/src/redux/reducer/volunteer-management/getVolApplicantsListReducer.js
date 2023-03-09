import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  volapplicantsData: [],
  msg: "",
  count: "",
};
export const getVolApplicantsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_VOLUNTEER_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_VOLUNTEER_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        volapplicantsData: action.payload,
        isLoading: false,
        msg: action.msg,
        count: action.count,
      };
    case adminTypes.GET_VOLUNTEER_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        volapplicantsData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
