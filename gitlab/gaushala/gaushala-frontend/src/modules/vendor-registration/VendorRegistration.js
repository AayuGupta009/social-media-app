import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../customHooks";
import {
  deleteVenNeed,
  venReqListAction,
} from "../../redux/action/vendor-management/vendorActions";
import VendorRegistrationSearch from "./VendorRegistrationSearch";
import VendorRegistrationTable from "./VendorRegistrationTable";

const VendorRegistration = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
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
      venReqListAction(rowsPerPage, page + 1, searchResult, selectedValue)
    );
  }, [dispatch, rowsPerPage, page, searchResult, selectedValue]);

  const { venReqData, count, msg } = useSelector(
    (store) => store.venReqListReducer
  );
  const handleDelete = (isDelete) => {
    console.log(isDelete, "isDelete");
    dispatch(
      deleteVenNeed(isDelete.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(
            venReqListAction(rowsPerPage, page + 1, searchResult, selectedValue)
          );
        }
        setIsDelete(false);
      })
    );
  };
  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "2rem" }}>
        {`${t("page_title.VendorManagement")}`}{" "}
      </Typography>
      <div className="wrapper_card">
        <VendorRegistrationSearch
          search={search}
          handleChangeSearch={handleChangeSearch}
          handleChange={handleChange}
          selectedValue={selectedValue}
        />
        <VendorRegistrationTable
          rows={venReqData ?? []}
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

export default VendorRegistration;
