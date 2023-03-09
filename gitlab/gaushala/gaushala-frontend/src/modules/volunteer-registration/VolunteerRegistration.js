import { Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../customHooks";
import {
  deleteVolNeed,
  volunteerReqListAction,
} from "../../redux/action/volunteer-management/volunteerAction";
import VolunteerRegistrationSearch from "./VolunteerRegistrationSearch";
import VolunteerRegistrationTable from "./VolunteerRegistrationTable";

const VolunteerRegistration = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDelete, setIsDelete] = useState(false);
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
      volunteerReqListAction(rowsPerPage, page + 1, searchResult, selectedValue)
    );
  }, [dispatch, rowsPerPage, page, searchResult, selectedValue, i18n]);

  const { volReqData, count, msg } = useSelector(
    (store) => store.volunteerReqListReducer
  );

  const handleDelete = (isDelete) => {
    dispatch(
      deleteVolNeed(isDelete.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(
            volunteerReqListAction(
              rowsPerPage,
              page + 1,
              searchResult,
              selectedValue
            )
          );
        }
        setIsDelete(false);
      })
    );
  };
  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "2rem" }}>
        {`${t("page_title.VolunteerManagement")}`}
      </Typography>
      <div className="wrapper_card">
        <VolunteerRegistrationSearch
          search={search}
          handleChangeSearch={handleChangeSearch}
          handleChange={handleChange}
          selectedValue={selectedValue}
        />
        <VolunteerRegistrationTable
          rows={volReqData ?? []}
          page={page}
          count={count ?? 0}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
          message={msg}
          handleDelete={handleDelete}
          setIsDelete={setIsDelete}
          isDelete={isDelete}
        />
      </div>
    </>
  );
};

export default VolunteerRegistration;
