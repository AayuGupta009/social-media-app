import { adminTypes } from "../../../type/adminTypes";
import { POST, DELETE, GET, PUT, PATCH } from "../../../../services/api";

export const finananceCowshedDataAction = (
  selectedValue,
  size,
  page,
  searchResult,
  id
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_FINANCE_DONATION_AMNT_PENDING,
        isLoading: true,
      });
      const type =
        selectedValue === 0 ? `type=1` : selectedValue === 1 ? `type=2` : "";
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const cowshedId = `cowshedId=${id}`;
      const res = await GET(
        `admin/finance/cowshed/?${pages}${sizes}${searchs}${type}&${cowshedId}`
      );
      dispatch({
        type: adminTypes.GET_FINANCE_DONATION_AMNT_SUCCESS,
        payload: res?.data.result,
        isLoading: false,
        msg: res.data.message ?? "",
        count: res?.data.result.count,
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_FINANCE_DONATION_AMNT_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};
