import { adminTypes } from "../../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  blogsData: [],
  msg: "",
  count: "",
};
export const getBlogsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_BLOGS_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_BLOGS_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        blogsData: action.payload,
        isLoading: false,
        msg: action.msg,
        count: action.count,
      };
    case adminTypes.GET_BLOGS_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        blogsData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
