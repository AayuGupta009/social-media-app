import { Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteVenApplicant,
  venApplicantsListAction,
} from "../../../redux/action/vendor-management/vendorActions";
import ViewVenApplicantsListSearch from "./ViewVenApplicantsListSearch";
import ViewVenApplicantsListTable from "./ViewVenApplicantsListTable";
import { useDebounce } from "../../../customHooks";
import CommonBreadcrumb from "../../../components/common/breadcumb";

const ViewVenApplicantsList = () => {
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
      venApplicantsListAction(rowsPerPage, page + 1, searchResult, params?.id)
    );
  }, [dispatch, rowsPerPage, page, searchResult, params?.id]);

  const { venapplicantsData, count, msg } = useSelector(
    (store) => store.venApplicantsListReducer
  );

  const handleDelete = () => {
    dispatch(
      deleteVenApplicant(isDelete.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(
            venApplicantsListAction(
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
        {`${t("page_title.VendorManagement")}`}
      </Typography>
      <div className="breadcumb" style={{ marginBottom: "2rem" }}>
        <CommonBreadcrumb
          routes={[
            {
              label: `${t("page_title.VendorManagement")}`,
              path: "/vendor-management",
            },
            {
              label: `${t("page_title.ven_appl_list")}`,
              path: `/vendor-management/vendor-applicants-list/${params.id}`,
            },
          ]}
        />
      </div>
      <div className="wrapper_card">
        <ViewVenApplicantsListSearch
          search={search}
          handleChangeSearch={handleChangeSearch}
        />
        <ViewVenApplicantsListTable
          rows={venapplicantsData ?? []}
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

export default ViewVenApplicantsList;
