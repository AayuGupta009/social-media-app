import { toast } from "react-toastify";
import { POST, DELETE, GET, PUT, PATCH } from "../../../services/api";
import store from "../../store";
import { adminTypes } from "../../type/adminTypes";

export const actRulesDataAction = (size, page, searchResult) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_ACT_RULES_DATA_PENDING,
        isLoading: true,
      });
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const res = await GET(`admin/act-rule/?${pages}${sizes}${searchs}`);
      dispatch({
        type: adminTypes.GET_ACT_RULES_DATA_SUCCESS,
        payload: res?.data.result.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
        count: res.data.result.count,
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_ACT_RULES_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const deleteActRules = (index, callback) => {
  return async (dispatch) => {
    try {
      const id = `actRuleId=${index}`;
      const res = await DELETE(`admin/act-rule/?${id}`);
      if (res?.data?.status_code === 200) {
        toast.success(res?.data?.message);
        callback(res);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
};

export const addActRules = (proData, callback) => {
  return async (dispatch) => {
    try {
      const datas = {
        ...proData,
      };
      const res = await POST(`admin/act-rule`, datas);
      if (res?.data?.status_code === 201) {
        toast.success(res?.data?.message);
        callback();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
};

export const actRulesEditDetailsAction = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.EDIT_DETAILS_ACT_RULES_DATA_PENDING,
        isLoading: true,
      });
      const id = `actRuleId=${_id}`;
      const res = await GET(`admin/act-rule/rule?${id}`);
      dispatch({
        type: adminTypes.EDIT_DETAILS_ACT_RULES_DATA_SUCCESS,
        payload: res?.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.EDIT_DETAILS_ACT_RULES_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const updateActRules = (_id, datas, callback) => {
  return async () => {
    const id = `actRuleId=${_id}`;
    const res = await PUT(`admin/act-rule/?${id}`, datas);
    if (res?.data?.status_code === 200) {
      toast.success(res?.data?.message);
      callback(res);
    } else {
      toast.error(res?.data?.message);
    }
  };
};
