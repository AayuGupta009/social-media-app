import axios, { GET } from "../../../services/api";
import { DeviceUUID } from "device-uuid";
import { toast } from "react-toastify";
import { adminTypes } from "../../type/adminTypes";

export const dashboardAction = (from, to) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_DASHBOARD_DATA_PENDING,
        isLoading: true,
      });
      const fromDates = `fromDate=${
        from ?? new Date("01-01-2022").toISOString()
      }&`;
      const toDates = `toDate=${to ?? new Date().toISOString()}`;

      const res = await GET(`admin/dashboard?${fromDates}${toDates}`);
      dispatch({
        type: adminTypes.GET_DASHBOARD_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_DASHBOARD_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};
