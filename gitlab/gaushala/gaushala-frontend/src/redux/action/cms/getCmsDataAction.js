import { toast } from "react-toastify";
import { POST, DELETE, GET, PUT, PATCH } from "../../../services/api";
import { adminTypes } from "../../type/adminTypes";

export const cmsDataAction = (types) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_CMS_DATA_PENDING,
        isLoading: true,
      });
      const type = `type=${types ?? ""}&`;
      const res = await GET(`admin/cms/?${type}`);
      dispatch({
        type: adminTypes.GET_CMS_DATA_SUCCESS,
        payload: res?.data.result ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
        count: res.data.result.count,
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_CMS_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const addCmsData = (types, data, callback) => {
  return async (dispatch) => {
    try {
      let datas;
      if (types === 2) {
        datas = {
          type: types,
          contactUs: {
            name: data.name,
            email: data.name,
            mobileNo: data.name,
            designation: data.name,
            address: data.name,
          },
        };
      } else {
        datas = {
          type: types,
          content: data,
        };
      }
      const contactDatas = {
        ...datas,
      };
      const res = await POST(`admin/cms`, contactDatas);
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

export const updateCms = (types, data, callback) => {
  return async () => {
    let datas;
    if (types === 2) {
      datas = {
        type: types,
        contactUs: {
          name: data.name,
          email: data.name,
          mobileNo: data.name,
          designation: data.name,
          address: data.name,
        },
      };
    } else {
      datas = {
        type: types,
        content: data,
      };
    }
    const updateDatas = {
      ...datas,
    };
    const res = await PUT(`admin/cms`, updateDatas);
    if (res?.data?.status_code === 201) {
      toast.success(res?.data?.message);
      callback(res);
    } else {
      toast.error(res?.data?.message);
    }
  };
};
