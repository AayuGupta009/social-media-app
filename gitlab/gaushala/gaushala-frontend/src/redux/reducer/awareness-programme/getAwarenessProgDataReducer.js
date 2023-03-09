import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  awareProgData: [],
  msg: "",
  count: "",
};
export const getAwarenessProgDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_AWARENESS_PROG_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_AWARENESS_PROG_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        awareProgData: action.payload,
        isLoading: false,
        msg: action.msg,
        count: action.count,
      };
    case adminTypes.GET_AWARENESS_PROG_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        awareProgData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const addProgrammeReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.ADD_AWARENESS_PROGRAMME_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.ADD_AWARENESS_PROGRAMME_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        awareProgData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.ADD_AWARENESS_PROGRAMME_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        awareProgData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
