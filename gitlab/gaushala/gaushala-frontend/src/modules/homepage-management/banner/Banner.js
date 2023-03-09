import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../customHooks";
import {
  addbanner,
  bannerDataAction,
  deletebanner,
  updatebanner,
} from "../../../redux/action/homepage-management/banners/bannerAction";
import { getFileDataAction } from "../../../redux/action/master-data/getFileDataAction";
import BannerSearch from "./BannerSearch";
import BannerTable from "./BannerTable";

const Banner = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDelete, setIsDelete] = useState(false);
  const [search, setSearch] = useState("");
  const searchResult = useDebounce(search, 1000);
  const inputRef = useRef(null);
  const navigate = useNavigate();

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
    dispatch(bannerDataAction(rowsPerPage, page + 1, searchResult));
  }, [dispatch, rowsPerPage, page, searchResult]);

  const { bannerData, msg, count } = useSelector(
    (store) => store.bannerDataReducer
  );
  const handleDelete = (isDelete) => {
    dispatch(
      deletebanner(isDelete.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(bannerDataAction(rowsPerPage, page + 1, searchResult));
        }
        setIsDelete(false);
      })
    );
  };

  const handleSubmit = () => {
    inputRef.current.click();
  };
  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append("file", selectedFile);
    const res = await dispatch(getFileDataAction(5, 0, formData));
    dispatch(
      addbanner(res?.data?.result?.uri, (res) => {
        if (res.data.status_code == 201) {
          dispatch(bannerDataAction(rowsPerPage, page + 1));
        }
      })
    );
  };

  const handleFileSelect = async (event, id) => {
    const selectednewFile = event.target.files;
    console.log("Selectedile:", selectednewFile[0]);
    const formData = new FormData();
    formData.append("file", selectednewFile[0]);
    const res = await dispatch(getFileDataAction(5, 0, formData));
    // const matchedId = bannerData.findIndex((item) => item._id === id);
    // bannerData[matchedId].image = res?.data?.result?.uri;
    console.log(id, "id");
    const updatedUrl = res?.data?.result?.uri;
    dispatch(
      updatebanner(id, updatedUrl, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(bannerDataAction(rowsPerPage, page + 1, searchResult));
        }
      })
    );
  };

  const handleEdit = (event, id) => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (event) => handleFileSelect(event, id);
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };
  return (
    <>
      <BannerSearch
        search={search}
        handleChangeSearch={handleChangeSearch}
        page={page}
        rowsPerPage={rowsPerPage}
        inputRef={inputRef}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
      />
      <BannerTable
        rows={bannerData ?? []}
        page={page}
        count={count ?? 0}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleChangePage={handleChangePage}
        message={msg}
        handleDelete={handleDelete}
        setIsDelete={setIsDelete}
        isDelete={isDelete}
        handleEdit={handleEdit}
      />
    </>
  );
};

export default Banner;
