import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  fileData: [],
  msg: "",
};
export const getFileDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_FILE_MASTER_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_FILE_MASTER_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        fileData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.GET_FILE_MASTER_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        fileData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
