import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import FinanceManagementSearchBar from "./FinanceManagementSearchBar";
import { Card, CardContent, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { useState } from "react";
import AdminFinanceTable from "./AdminFinanceTable";
import CowshedFinanceTable from "./CowshedFinanceTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../customHooks";
import { finananceDataAction } from "../../redux/action/finance/finananceDataAction";

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
const FinanceManagement = () => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const searchResult = useDebounce(search, 1000);

  useEffect(() => {
    dispatch(finananceDataAction(value, rowsPerPage, page + 1, searchResult));
  }, [dispatch, value, rowsPerPage, page, searchResult]);

  const { financeData, msg, count } = useSelector(
    (store) => store.finanaceDataReducerData
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

  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "2rem" }}>{`${t(
        "page_title.FinanceManagement"
      )}`}</Typography>
      <div className="wrapper_card">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{ borderBottom: "1px solid #EAEAEA" }}
          className="tab_main"
        >
          <Tab label={t("tab.cowshed")} {...a11yProps(0)} />
          <Tab label={t("tab.admin")} {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0} className="tabpanel_bx">
          <FinanceManagementSearchBar
            searchText={t("page_title.donation_list")}
            search={search}
            handleChangeSearch={handleChangeSearch}
            placeholder={t("table.gaushala")}
          />
          <CowshedFinanceTable
            rows={financeData}
            page={page}
            count={count ?? 0}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            message={msg}
          />
        </TabPanel>
        <TabPanel value={value} index={1} className="tabpanel_bx">
          <FinanceManagementSearchBar
            searchText={t("page_title.donatListAdmin")}
            handleChangeSearch={handleChangeSearch}
            search={search}
            placeholder={`${t("table.name")} , ${t("table.email")} , ${t(
              "table.mob_no"
            )}`}
          />
          <AdminFinanceTable
            rows={financeData ?? []}
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

export default FinanceManagement;
