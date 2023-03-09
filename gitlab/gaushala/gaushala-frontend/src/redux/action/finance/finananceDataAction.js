import { toast } from "react-toastify";
import { POST, DELETE, GET, PUT, PATCH } from "../../../services/api";
import { adminTypes } from "../../type/adminTypes";

export const finananceDataAction = (
  selectedValue,
  size,
  page,
  searchResult
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_FINANCE_DATA_PENDING,
        isLoading: true,
      });
      const type =
        selectedValue === 0 ? `type=1` : selectedValue === 1 ? `type=2` : "";
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const res = await GET(`admin/finance/?${pages}${sizes}${searchs}${type}`);
      dispatch({
        type: adminTypes.GET_FINANCE_DATA_SUCCESS,
        payload: res?.data.result.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
        count: res?.data.result.count,
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_FINANCE_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};
