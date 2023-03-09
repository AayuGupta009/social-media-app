import { Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommonBreadcrumb from "../../../components/common/breadcumb";
import { useDebounce } from "../../../customHooks";
import {
  deleteVolApplicant,
  volunteerApplicantsListAction,
} from "../../../redux/action/volunteer-management/volunteerAction";
import ViewVolApplicantsListSearch from "./ViewVolApplicantsListSearch";
import ViewVolApplicantsListTable from "./ViewVolApplicantsListTable";

const ViewVolApplicantsList = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDelete, setIsDelete] = useState(false);
  const [search, setSearch] = useState("");
  const searchResult = useDebounce(search, 1000);
  const params = useParams();
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
      volunteerApplicantsListAction(
        rowsPerPage,
        page + 1,
        searchResult,
        params?.id
      )
    );
  }, [dispatch, rowsPerPage, page, searchResult, params?.id]);

  const { volapplicantsData, count, msg } = useSelector(
    (store) => store.volApplicantsListReducer
  );
  const handleDelete = () => {
    dispatch(
      deleteVolApplicant(isDelete.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(
            volunteerApplicantsListAction(
              rowsPerPage,
              page + 1,
              searchResult,
              params?.id
            )
          );
        }
        setIsDelete(false);
      })
    );
  };

  return (
    <>
      <Typography variant="h4" style={{ marginBottom: ".5rem" }}>
        {`${t("page_title.VolunteerManagement")}`}
      </Typography>
      <div className="breadcumb" style={{ marginBottom: "2rem" }}>
        <CommonBreadcrumb
          routes={[
            {
              label: `${t("page_title.VolunteerManagement")}`,
              path: "/volunteer-management",
            },
            {
              label: `${t("page_title.vol_appl_list")}`,
              path: `/volunteer-management/volunteer-applicants-list/${params.id}`,
            },
          ]}
        />
      </div>
      <div className="wrapper_card">
        <ViewVolApplicantsListSearch
          search={search}
          handleChangeSearch={handleChangeSearch}
        />
        <ViewVolApplicantsListTable
          rows={volapplicantsData ?? []}
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

export default ViewVolApplicantsList;
