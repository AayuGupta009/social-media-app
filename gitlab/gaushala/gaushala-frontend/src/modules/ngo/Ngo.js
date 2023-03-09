import { Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import SerachFilter from "./SerachFilter";
import { useEffect } from "react";
import {
  deleteRegNgo,
  getNgoManagementData,
} from "../../redux/action/ngo/ngoAction";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../customHooks";
import NgoRegisterTable from "./NgoRegisterTable";
import NgoReqTable from "./NgoReqTable";
import { blockAction } from "../../redux/action/master-data/block/blockAction";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Ngo = () => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const searchResult = useDebounce(search, 1000);
  const [isBlock, setIsBlock] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    dispatch(getNgoManagementData(value, rowsPerPage, page + 1, searchResult));
  }, [dispatch, value, rowsPerPage, page, searchResult]);

  const { ngoData, msg, count } = useSelector(
    (store) => store.ngoManagementReducer
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleBlock = () => {
    dispatch(
      blockAction(isBlock?.status, 1, isBlock?.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(
            getNgoManagementData(value, rowsPerPage, page + 1, searchResult)
          );
        }
        setIsBlock(false);
      })
    );
  };

  const handleDelete = (isDelete) => {
    dispatch(
      deleteRegNgo(isDelete.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(
            getNgoManagementData(value, rowsPerPage, page + 1, searchResult)
          );
        }
        setIsDelete(false);
      })
    );
  };
  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "2rem" }}>
        {`${t("page_title.NgoManagement")}`}
      </Typography>

      <div className="wrapper_card">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{ borderBottom: "1px solid #EAEAEA" }}
          className="tab_main"
        >
          <Tab label={t("tab.ngo_reg")} {...a11yProps(0)} />
          <Tab label={t("tab.ngo_reg_req")} {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0} className="tabpanel_bx">
          <SerachFilter
            handleChangeSearch={handleChangeSearch}
            search={search}
          />
          <NgoRegisterTable
            rows={ngoData ?? []}
            page={page}
            count={count ?? 0}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            message={msg}
            handleDelete={handleDelete}
            setIsDelete={setIsDelete}
            isDelete={isDelete}
            setIsBlock={setIsBlock}
            isBlock={isBlock}
            handleBlock={handleBlock}
          />
        </TabPanel>
        <TabPanel value={value} index={1} className="tabpanel_bx">
          <SerachFilter
            search={search}
            handleChangeSearch={handleChangeSearch}
          />
          <NgoReqTable
            rows={ngoData ?? []}
            page={page}
            count={count ?? 0}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            message={msg}
          />
        </TabPanel>
      </div>
    </>
  );
};

export default Ngo;
