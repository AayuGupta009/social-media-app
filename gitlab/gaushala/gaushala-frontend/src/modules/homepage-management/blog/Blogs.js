import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../../customHooks";
import {
  blogsDataAction,
  deleteBlogs,
} from "../../../redux/action/homepage-management/blogs/blogsAction";
import BlogsSearch from "./BlogsSearch";
import BlogsTable from "./BlogsTable";

const Blogs = () => {
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);
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
    dispatch(blogsDataAction(rowsPerPage, page + 1, searchResult));
  }, [dispatch, rowsPerPage, page, searchResult]);

  const { blogsData, msg, count } = useSelector(
    (store) => store.blogsDataReducer
  );
  const handleDelete = (isDelete) => {
    dispatch(
      deleteBlogs(isDelete.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(blogsDataAction(rowsPerPage, page + 1, searchResult));
          setIsDelete(false);
        }
      })
    );
  };

  return (
    <>
      <BlogsSearch search={search} handleChangeSearch={handleChangeSearch} />
      <BlogsTable
        rows={blogsData ?? []}
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
    </>
  );
};

export default Blogs;
