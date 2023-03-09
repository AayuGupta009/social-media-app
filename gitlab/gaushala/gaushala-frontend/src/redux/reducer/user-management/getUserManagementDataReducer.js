import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  userData: [],
  msg: "",
};
export const getUserManagementDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_USER_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        userData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.GET_USER_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        userData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.DELETE_USER_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.DELETE_USER_DATA_SUCCESS:
      const updatedData = [...state.userData].filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        searchLoading: action.isLoading,
        userData: updatedData,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.DELETE_USER_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        userData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
