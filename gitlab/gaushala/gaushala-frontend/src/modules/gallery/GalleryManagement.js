import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addGallery,
  deleteGalleryData,
  getGalleryData,
} from "../../redux/action/gallery-management/galleryManagementAction";
import { getFileDataAction } from "../../redux/action/master-data/getFileDataAction";
import GalleryBox from "./GalleryBox";
import GalleryHeader from "./GalleryHeader";

const GalleryManagement = () => {
  const [imageid, setImageId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { count, msg, galleryData } = useSelector(
    (store) => store.galleryDataReducer
  );

  useEffect(() => {
    dispatch(getGalleryData(page + 1, rowsPerPage));
  }, [dispatch, rowsPerPage, page]);

  const handleDelete = () => {
    dispatch(
      deleteGalleryData(imageid, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(getGalleryData(page + 1, rowsPerPage));
          setAnchorEl(null);
        }
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
    const res = await dispatch(getFileDataAction(0, 0, formData));
    dispatch(
      addGallery(res?.data?.result?.uri, (res) => {
        if (res.data.status_code == 201) {
          dispatch(getGalleryData(page + 1, rowsPerPage));
        }
      })
    );
  };

  return (
    <>
      <div className="wrapper_card">
        <div className="admin">
          <GalleryHeader
            page={page}
            rowsPerPage={rowsPerPage}
            inputRef={inputRef}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
          />
          <GalleryBox
            dataResult={galleryData}
            count={count}
            message={msg}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            handleDelete={handleDelete}
            setImageId={setImageId}
            setAnchorEl={setAnchorEl}
            anchorEl={anchorEl}
          />
        </div>
      </div>
    </>
  );
};

export default GalleryManagement;
