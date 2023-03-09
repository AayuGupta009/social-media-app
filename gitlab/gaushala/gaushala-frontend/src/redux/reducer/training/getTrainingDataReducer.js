import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  videoData: [],
  msg: "",
  count: "",
};

export const getTrainingDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_TRAINING_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_TRAINING_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        videoData: action.payload,
        isLoading: false,
        msg: action.msg,
        count: action.count,
      };
    case adminTypes.GET_TRAINING_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        videoData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
