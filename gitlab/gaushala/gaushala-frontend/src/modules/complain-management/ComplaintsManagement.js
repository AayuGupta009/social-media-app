import { Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../customHooks";
import {
  deleteComplaint,
  getComplaintData,
} from "../../redux/action/complain-management/complainManagement";
import { getComplainTypeDataActions } from "../../redux/action/master-data/getComplainTypeDataActions";
import ComplaintsManagementSearch from "./ComplaintsManagementSearch";
import ComplaintsManagementTable from "./ComplaintsManagementTable";

const ComplaintsManagement = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [cityId, setCityId] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const [search, setSearch] = useState("");
  const searchResult = useDebounce(search, 1000);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    dispatch(
      getComplaintData(
        rowsPerPage,
        page + 1,
        searchResult,
        selectedValue,
        cityId
      )
    );
  }, [dispatch, rowsPerPage, page, searchResult, selectedValue, cityId, i18n]);

  const { result, message } = useSelector(
    (store) => store.complaintDataReducer?.complainData
  );
  useEffect(() => {
    dispatch(getComplainTypeDataActions());
  }, [dispatch]);

  const complainType = useSelector(
    (store) => store.complainTypeReducer?.complainTypeData
  );
  const complainOptions = complainType?.result?.data ?? [];

  const handleCityChange = (e) => {
    if (e.target.checked) {
      setCityId(e.target.id);
    }
  };
  const handleDelete = (isDelete) => {
    dispatch(
      deleteComplaint(isDelete.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(
            getComplaintData(rowsPerPage, page + 1, searchResult, selectedValue)
          );
        }
        setIsDelete(false);
      })
    );
  };
  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "2rem" }}>
        {`${t("page_title.ComplaintsManagement")}`}
      </Typography>
      <div className="wrapper_card">
        <ComplaintsManagementSearch
          search={search}
          handleChangeSearch={handleChangeSearch}
          handleChange={handleChange}
          selectedValue={selectedValue}
          complainOptions={complainOptions}
          handleCityChange={handleCityChange}
        />
        <ComplaintsManagementTable
          rows={result?.data}
          page={page}
          count={result?.count ?? 0}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
          message={message}
          handleDelete={handleDelete}
          setIsDelete={setIsDelete}
          isDelete={isDelete}
        />
      </div>
    </>
  );
};

export default ComplaintsManagement;
