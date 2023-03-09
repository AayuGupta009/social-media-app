import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  ngoData: [],
  msg: "",
  count: "",
};
export const getNgoManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_NGO_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
        count: action.count,
      };
    case adminTypes.GET_NGO_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        ngoData: action.payload,
        isLoading: false,
        msg: action.msg,
        count: action.count,
      };
    case adminTypes.GET_NGO_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        ngoData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
