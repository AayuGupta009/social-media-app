import { adminTypes } from "../../type/adminTypes";

const initialState = {
  searchLoading: false,
  isLoading: false,
  volReqData: [],
  msg: "",
  count: "",
};

export const getVolunteerReqListReducer = (state = initialState, action) => {
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
        volReqData: action.payload,
        isLoading: false,
        msg: action.msg,
        count: action.count,
      };
    case adminTypes.GET_VOLUNTEER_DATA_FAILED:
      return {
        ...state,
        searchLoading: action.isLoading,
        volReqData: action.payload,
        msg: action.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};

// export const deleteVolReqDataReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case adminTypes.DELETE_VOLUNTEER_DATA_PENDING:
//       return {
//         ...state,
//         searchLoading: action.isLoading,
//         isLoading: true,
//         msg: "",
//       };
//     case adminTypes.DELETE_VOLUNTEER_DATA_SUCCESS:
//       console.log(...state.volReqData, "xxxxxxxxxxx");
//       return {
//         ...state,
//         searchLoading: action.isLoading,
//         volReqData: [
//           ...state.volReqData.filter((item) => item._id !== action.payload),
//         ],
//         isLoading: false,
//         msg: action.msg,
//         count: action.count,
//       };
//     case adminTypes.DELETE_VOLUNTEER_DATA_FAILED:
//       return {
//         ...state,
//         searchLoading: action.isLoading,
//         volReqData: action.payload,
//         msg: action.msg,
//         isLoading: false,
//       };
//     default:
//       return state;
//   }
// };
