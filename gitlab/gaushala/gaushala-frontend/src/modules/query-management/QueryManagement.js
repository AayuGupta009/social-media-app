import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../customHooks";
import {
  deleteQuery,
  queryDataAction,
  replyQuery,
  ReplyQuery,
} from "../../redux/action/query-managment/queryManagementAction";
import QueryManagementSearchBar from "./QueryManagementSearchBar";
import QueryManagementTable from "./QueryManagementTable";

const QueryManagement = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const searchResult = useDebounce(search, 1000);
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);
  const [modalId, setModalId] = useState("");

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
    dispatch(queryDataAction(rowsPerPage, page + 1, searchResult));
  }, [dispatch, rowsPerPage, page, searchResult]);

  const { queryData, msg, count } = useSelector(
    (store) => store.queryDataReducer
  );
  const handleDelete = () => {
    dispatch(
      deleteQuery(isDelete.deleteId, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(queryDataAction(rowsPerPage, page + 1, searchResult));
          setIsDelete(false);
        }
      })
    );
  };
  const reasonText = (e) => {
    setReason(e.target.value);
  };
  const handleSubmit = (e) => {
    dispatch(
      replyQuery(reason, modalId, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(queryDataAction(rowsPerPage, page + 1, searchResult));
          setOpen(false);
        }
      })
    );
  };
  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "2rem" }}>{`${t(
        "page_title.query"
      )}`}</Typography>
      <div className="wrapper_card">
        <QueryManagementSearchBar
          search={search}
          handleChangeSearch={handleChangeSearch}
        />
        <QueryManagementTable
          rows={queryData ?? []}
          page={page}
          count={count ?? 0}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
          message={msg}
          handleDelete={handleDelete}
          setIsDelete={setIsDelete}
          isDelete={isDelete}
          handleSubmit={handleSubmit}
          reasonText={reasonText}
          reason={reason}
          open={open}
          setOpen={setOpen}
          setModalId={setModalId}
        />
      </div>
    </>
  );
};

export default QueryManagement;
