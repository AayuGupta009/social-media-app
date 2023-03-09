import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  galleryData: [],
  msg: "",
  count: "",
};

export const getGalleryDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_GALLERY_DATA_PENDING:
      return {
        ...state,
        searchLoading: action.isLoading,
        isLoading: true,
        msg: "",
      };
    case adminTypes.GET_GALLERY_DATA_SUCCESS:
      return {
        ...state,
        searchLoading: action.isLoading,
        galleryData: action.payload,
        isLoading: false,
        msg: action.msg,
        count: action.count,
      };
    case adminTypes.GET_GALLERY_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        galleryData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};
