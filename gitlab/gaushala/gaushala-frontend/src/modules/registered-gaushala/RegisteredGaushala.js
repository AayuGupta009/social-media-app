import { Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import "./reg_gaushala.scss";
import SerachFilter from "./SerachFilter";
import CowshedRequestTable from "./reg-cowshed-request/CowshedRequestTable";
import RegisteredCowshedTable from "./registered_cowshed/RegisteredCowshedTable";
import {
  deleteCowshedRequest,
  getGaushalaManagementData,
} from "../../redux/action/gaushala-management/getGaushalaManagementData";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../customHooks";
import { getDistrictMasterData } from "../../redux/action/master-data/getDistrictMasterData";
import { blockAction } from "../../redux/action/master-data/block/blockAction";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const RegisteredGaushala = () => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [cityId, setCityId] = useState([]);
  const searchResult = useDebounce(search, 1000);
  const [isBlock, setIsBlock] = useState(false);

  const cowshedPayload = {
    type: value,
    size: rowsPerPage,
    page: page + 1,
    search: searchResult,
    districtId: cityId,
  };

  useEffect(() => {
    dispatch(getGaushalaManagementData(cowshedPayload));
  }, [dispatch, value, rowsPerPage, page, searchResult, cityId]);

  const { result, message } = useSelector(
    (store) => store.GaushalaManagementReducer?.gaushalaData
  );
  useEffect(() => {
    dispatch(getDistrictMasterData());
  }, [dispatch]);

  const district = useSelector(
    (store) => store.districtMasterData.districtData
  );
  const handleDelete = (isDelete) => {
    dispatch(
      deleteCowshedRequest(isDelete.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(
            getGaushalaManagementData(
              value,
              rowsPerPage,
              page + 1,
              searchResult,
              cityId
            )
          );
        }
        setIsDelete(false);
      })
    );
  };
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
  const handleCityChange = (e) => {
    if (e.target.checked) {
      setCityId((prev) => [...prev, e.target.id]);
    }
  };
  const handleBlock = () => {
    dispatch(
      blockAction(isBlock?.status, 0, isBlock?.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(
            getGaushalaManagementData(
              value,
              rowsPerPage,
              page + 1,
              searchResult,
              cityId
            )
          );
        }
        setIsBlock(false);
      })
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "2rem" }}>
        {`${t("page_title.GaushalaManagement")}`}
      </Typography>

      <div className="wrapper_card">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{ borderBottom: "1px solid #EAEAEA" }}
          className="tab_main"
        >
          <Tab label={t("tab.registered_cowshed")} {...a11yProps(1)} />
          <Tab label={t("tab.reg_req")} {...a11yProps(0)} />
        </Tabs>
        <TabPanel value={value} index={1} className="tabpanel_bx">
          <SerachFilter
            search={search}
            handleChangeSearch={handleChangeSearch}
            district={district?.result?.data}
            handleCityChange={handleCityChange}
          />
          <CowshedRequestTable
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
          />
        </TabPanel>
        <TabPanel value={value} index={0} className="tabpanel_bx">
          <SerachFilter
            search={search}
            handleChangeSearch={handleChangeSearch}
            district={district?.result?.data}
            handleCityChange={handleCityChange}
          />
          <RegisteredCowshedTable
            rows={result?.data}
            page={page}
            message={message}
            count={result?.count ?? 0}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            handleDelete={handleDelete}
            setIsDelete={setIsDelete}
            isDelete={isDelete}
            setIsBlock={setIsBlock}
            isBlock={isBlock}
            handleBlock={handleBlock}
          />
        </TabPanel>
      </div>
    </>
  );
};

export default RegisteredGaushala;
