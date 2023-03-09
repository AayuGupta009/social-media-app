import { Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../customHooks";
import { blockAction } from "../../redux/action/master-data/block/blockAction";
import {
  deleteUser,
  userDataAction,
} from "../../redux/action/user-management/userManagementAction";
import UserManagementSearchBar from "./UserManagementSearchBar";
import UserManagementTable from "./UserManagementTable";

const UserManagement = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    dispatch(userDataAction(rowsPerPage, page + 1, searchResult));
  }, [dispatch, rowsPerPage, page, searchResult]);

  const { result, message } = useSelector(
    (store) => store.userManagementDataReducer?.userData
  );

  const handleDelete = (isDelete) => {
    dispatch(
      deleteUser(isDelete.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(userDataAction(rowsPerPage, page + 1, searchResult));
        }
        setIsDelete(false);
      })
    );
  };
  const handleBlock = () => {
    dispatch(
      blockAction(isBlock?.status, 0, isBlock?.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(userDataAction(rowsPerPage, page + 1, searchResult));
        }
        setIsBlock(false);
      })
    );
  };

  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "2rem" }}>{`${t(
        "page_title.UserManagement"
      )}`}</Typography>
      <div className="wrapper_card">
        <UserManagementSearchBar
          search={search}
          handleChangeSearch={handleChangeSearch}
        />
        <UserManagementTable
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
          setIsBlock={setIsBlock}
          isBlock={isBlock}
          handleBlock={handleBlock}
        />
      </div>
    </>
  );
};

export default UserManagement;
