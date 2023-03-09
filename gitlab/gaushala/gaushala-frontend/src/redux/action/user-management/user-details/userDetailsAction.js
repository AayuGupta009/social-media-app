import { GET } from "../../../../services/api";
import { adminTypes } from "../../../type/adminTypes";

// user donation
export const userDonationAction = (size, page, searchResult, userid) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_DATA_PENDING,
        isLoading: true,
      });
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const userId = `userId=${userid}`;
      const res = await GET(
        `admin/user/donation-list/?${pages}${sizes}${searchs}${userId}`
      );
      dispatch({
        type: adminTypes.GET_USER_DETAILS_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

// user complaint
export const userComplainAction = (userComplainPaload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_DATA_PENDING,
        isLoading: true,
      });
      for (let key in userComplainPaload) {
        if (
          userComplainPaload[key] === "" ||
          userComplainPaload[key] === " " ||
          userComplainPaload[key] === []
        ) {
          delete userComplainPaload[key];
        }
      }
      const res = await GET(`admin/user/complaint-list`, userComplainPaload);
      dispatch({
        type: adminTypes.GET_USER_DETAILS_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};
export const userComplainDataViewAction = (appnID, userId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_VIEW_DATA_PENDING,
        isLoading: true,
      });
      const idUser = `userId=${userId}`;
      const appncaTionID = `applicationId=${appnID}`;
      const res = await GET(
        `admin/user/complaint-list/application?${appncaTionID}&${idUser}`
      );
      dispatch({
        type: adminTypes.GET_USER_DETAILS_VIEW_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_VIEW_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

// user volunteer list
export const userVolDataAction = (size, page, searchResult, userid) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_DATA_PENDING,
        isLoading: true,
      });
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const userId = `userId=${userid}`;
      const res = await GET(
        `admin/user/volunteer-requirement-list?${pages}${sizes}${searchs}${userId}`
      );
      dispatch({
        type: adminTypes.GET_USER_DETAILS_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const userVolDataViewAction = (appnID, userId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_VIEW_DATA_PENDING,
        isLoading: true,
      });
      const idUser = `userId=${userId}`;
      const appncaTionID = `applicationId=${appnID}`;
      const res = await GET(
        `admin/user/volunteer-requirement-list/application?${appncaTionID}&${idUser}`
      );
      dispatch({
        type: adminTypes.GET_USER_DETAILS_VIEW_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_VIEW_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};
// user vendor list
export const userVenDataAction = (size, page, searchResult, userid) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_DATA_PENDING,
        isLoading: true,
      });
      const sizes = `size=${size ?? 10}&`;
      const pages = `page=${page ?? 1}&`;
      const searchs = searchResult ? `search=${searchResult}&` : "";
      const userId = `userId=${userid}`;
      const res = await GET(
        `admin/user/merchant-requirement-list?${pages}${sizes}${searchs}${userId}`
      );
      dispatch({
        type: adminTypes.GET_USER_DETAILS_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const userVenDataViewAction = (appnID, userId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_VIEW_DATA_PENDING,
        isLoading: true,
      });
      const idUser = `userId=${userId}`;
      const appncaTionID = `applicationId=${appnID}`;
      const res = await GET(
        `admin/user/merchant-requirement-list/application?${appncaTionID}&${idUser}`
      );
      dispatch({
        type: adminTypes.GET_USER_DETAILS_VIEW_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_VIEW_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

// user cow adoption request
export const userAdopDataAction = (userAdopReqPaload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_DATA_PENDING,
        isLoading: true,
      });
      for (let key in userAdopReqPaload) {
        if (
          userAdopReqPaload[key] === "" ||
          userAdopReqPaload[key] === " " ||
          userAdopReqPaload[key] === []
        ) {
          delete userAdopReqPaload[key];
        }
      }
      const res = await GET(`admin/user/adopt-request-list`, userAdopReqPaload);
      dispatch({
        type: adminTypes.GET_USER_DETAILS_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};

export const userAdopDataViewAction = (appnID, userId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_VIEW_DATA_PENDING,
        isLoading: true,
      });
      const idUser = `userId=${userId}`;
      const appncaTionID = `applicationId=${appnID}`;
      const res = await GET(
        `admin/user/adopt-request-list/application?${appncaTionID}&${idUser}`
      );
      dispatch({
        type: adminTypes.GET_USER_DETAILS_VIEW_DATA_SUCCESS,
        payload: res.data ?? [],
        isLoading: false,
        msg: res.data.message ?? "",
      });
    } catch (error) {
      dispatch({
        type: adminTypes.GET_USER_DETAILS_VIEW_DATA_FAILED,
        payload: [],
        isLoading: false,
        msg: (error && error?.message) ?? "",
      });
    }
  };
};
