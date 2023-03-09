import { Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../customHooks";
import {
  deleteProgramme,
  programmeDataAction,
} from "../../redux/action/awareness-programme/awarenessProgAction";
import store from "../../redux/store";
import AwarenessProgrammesSearch from "./AwarenessProgrammesSearch";
import AwarenessProgrammesTable from "./AwarenessProgrammesTable";

const AwarenessProgrammes = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const searchResult = useDebounce(search, 1000);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    // if (search === "") {
    //   return;
    // }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(programmeDataAction(rowsPerPage, page + 1, searchResult));
  }, [dispatch, rowsPerPage, page, searchResult]);

  const { awareProgData, msg, count } = useSelector(
    (store) => store.awarenessProgDataReducer
  );
  const handleDelete = (isDelete) => {
    dispatch(
      deleteProgramme(isDelete.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(programmeDataAction(rowsPerPage, page + 1, searchResult));
        }
        setIsDelete(false);
      })
    );
  };
  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "2rem" }}>
        {`${t("page_title.AwarenessProgramme")}`}{" "}
      </Typography>
      <div className="wrapper_card">
        <AwarenessProgrammesSearch
          search={search}
          handleChangeSearch={handleChangeSearch}
        />
        <AwarenessProgrammesTable
          rows={awareProgData ?? []}
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

export default AwarenessProgrammes;
