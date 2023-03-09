import { Button, Grid, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as AddIcon } from "../../../assets/images/plus-circle.svg";

import FaqTable from "./FaqTable";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  deleteFaq,
  faqDataAction,
} from "../../../redux/action/cms/faq/faqAction";

const Faq = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(faqDataAction(rowsPerPage, page + 1));
  }, [dispatch, rowsPerPage, page]);

  const { faqData, msg, count } = useSelector((store) => store.faqDatasReducer);
  const handleDelete = () => {
    dispatch(
      deleteFaq(isDelete.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(faqDataAction(rowsPerPage, page + 1));
          setIsDelete(false);
        }
      })
    );
  };
  return (
    <>
      <Grid
        container
        spacing={1}
        style={{
          marginBottom: "3.1%",
          marginTop: "2.1%",
          display: "flex",
          alignItems: "center",
        }}
        className="top_search_filter_bx"
      >
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            textAlign: "right",
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            color="primary"
            sx={{
              borderRadius: "100px",
              height: "45px",
              width: { xs: "auto", lg: "15%" },
              fontWeight: "600",
              lineHeight: "45px",
            }}
            onClick={() => navigate(`/cms/add-faq`)}
          >
            {`${t("buttons.add_faq")}`}
          </Button>
        </Grid>
      </Grid>
      <FaqTable
        rows={faqData ?? []}
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

export default Faq;
