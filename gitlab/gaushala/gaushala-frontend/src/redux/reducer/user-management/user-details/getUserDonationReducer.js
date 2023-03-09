import { adminTypes } from "../../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  userDonationData: [],
  msg: "",
};
export const getUserDonationReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_USER_DETAILS_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_USER_DETAILS_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        userDonationData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.GET_USER_DETAILS_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        userDonationData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
