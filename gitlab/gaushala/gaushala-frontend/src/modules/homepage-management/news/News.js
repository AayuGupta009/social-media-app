import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../../customHooks";
import {
  deleteNews,
  newsDataAction,
} from "../../../redux/action/homepage-management/news/newsAction";
import NewsSearch from "./NewsSearch";
import NewsTable from "./NewsTable";

const News = () => {
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
    dispatch(newsDataAction(rowsPerPage, page + 1, searchResult));
  }, [dispatch, rowsPerPage, page, searchResult]);

  const { newsData, msg, count } = useSelector(
    (store) => store.newsDataReducer
  );
  const handleDelete = () => {
    dispatch(
      deleteNews(isDelete.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(newsDataAction(rowsPerPage, page + 1, searchResult));
          setIsDelete(false);
        }
      })
    );
  };

  return (
    <>
      <NewsSearch search={search} handleChangeSearch={handleChangeSearch} />
      <NewsTable
        rows={newsData ?? []}
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

export default News;
