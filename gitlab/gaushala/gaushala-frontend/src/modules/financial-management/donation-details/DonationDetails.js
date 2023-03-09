import { Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import DonationDetailsTop from "./DonationDetailsTop";
import ReceivedDonationTable from "./ReceivedDonationTable";
import AdopDonationTable from "./AdopDonationTable";
import Seach from "./Seach";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../../customHooks";
import { finananceCowshedDataAction } from "../../../redux/action/finance/cowshed/finananceCowshedDataAction";
import { useParams } from "react-router-dom";

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
const DonationDetails = () => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const searchResult = useDebounce(search, 1000);
  const { id } = useParams();

  useEffect(() => {
    dispatch(
      finananceCowshedDataAction(value, rowsPerPage, page + 1, searchResult, id)
    );
  }, [dispatch, value, rowsPerPage, page, searchResult, id]);

  const { financeCowshedData, msg, count } = useSelector(
    (store) => store.financeCowshedReducer
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

  // useEffect(() => {
  //   const activeTab = localStorage.getItem("activeTab");
  //   if (activeTab) {
  //     setValue(parseInt(activeTab));
  //   }
  // }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("activeTab", newValue);
  };
  return (
    <>
      <DonationDetailsTop cowshedDetails={financeCowshedData?.cowshedDetails} />
      <div className="wrapper_card">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{
            borderBottom: "1px solid #EAEAEA",
            justifyContent: "space-between !important",
            width: "100%",
          }}
          className="tab_main"
        >
          <Tab label={t("table.rec_donation")} {...a11yProps(0)} />
          <Tab label={t("table.received_adop_amount")} {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0} className="tabpanel_bx">
          <Seach
            search={search}
            handleChangeSearch={handleChangeSearch}
            placeholder={`${t("table.name")} , ${t("table.mob_no")}`}
          />
          <ReceivedDonationTable
            rows={financeCowshedData?.data ?? []}
            page={page}
            count={count ?? 0}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            message={msg}
          />
        </TabPanel>
        <TabPanel value={value} index={1} className="tabpanel_bx">
          <Seach
            search={search}
            handleChangeSearch={handleChangeSearch}
            placeholder={`${t("table.name")}  , ${t("table.email")} , ${t(
              "table.mob_no"
            )}, ${t("table.bar_code")} `}
          />
          <AdopDonationTable
            rows={financeCowshedData?.data}
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

export default DonationDetails;
