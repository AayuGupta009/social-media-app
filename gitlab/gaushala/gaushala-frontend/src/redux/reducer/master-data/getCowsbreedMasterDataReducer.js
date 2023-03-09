import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  cowBreedData: [],
  msg: "",
};
export const getCowsbreedMasterDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_COWBREED_MASTER_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_COWBREED_MASTER_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        cowBreedData: action.payload,
        isLoading: false,
        msg: action.msg,
      };
    case adminTypes.GET_COWBREED_MASTER_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        cowBreedData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
