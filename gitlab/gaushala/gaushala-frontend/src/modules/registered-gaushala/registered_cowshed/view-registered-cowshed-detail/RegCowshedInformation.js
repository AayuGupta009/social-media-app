import { Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import "../../reg_gaushala.scss";
import SerachFilter from "./SerachFilter";
import CowshedCowTable from "./cowshed-cow/CowshedCowTable";
import AdoptionCowTable from "./adopted-cow/AdoptionCowTable";
import AdoptionRequestTable from "./cow-adoption-request/AdoptionRequestTable";
import RegCowshedInformationTop from "./RegCowshedInformationTop";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../../../customHooks";
import {
  cowAdoptionReqData,
  deleteAdoptCowRequest,
  regCowshedCowData,
} from "../../../../redux/action/gaushala-management/getGaushalaManagementData";
import { useLocation, useParams } from "react-router-dom";
import { getCowBreedMasterDataAction } from "../../../../redux/action/master-data/getCowBreedMasterDataAction";
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

const RegCowshedInformation = () => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [breedId, setBreedId] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const searchResult = useDebounce(search, 1000);
  const params = useParams();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleBreedChange = (e) => {
    if (e.target.checked) {
      setBreedId((breedId) => [...breedId, e.target.id]);
    }
  };
  const viewCowshedPayload = {
    type: value === 0 ? false : true,
    size: rowsPerPage,
    page: page + 1,
    search: searchResult,
    cowBreed: breedId,
    cowshedId: params?.id,
  };

  const { state } = useLocation();
  useEffect(() => {
    if (value === 0 || value === 1) {
      dispatch(regCowshedCowData(viewCowshedPayload));
    }
  }, [dispatch, value, rowsPerPage, page, searchResult, params?.id]);

  const { result, message } = useSelector(
    (store) => store.regCowshedCowDataReducer?.cowshedCowData
  );

  useEffect(() => {
    if (value === 2) {
      dispatch(cowAdoptionReqData(viewCowshedPayload));
    }
  }, [dispatch, value, rowsPerPage, page, searchResult, params?.id]);

  const adopCowData = useSelector(
    (store) => store.cowAdoptionReqReducer?.adoptedCowData
  );

  const handleDelete = (isDelete) => {
    dispatch(
      deleteAdoptCowRequest(isDelete.id, params?.id, (res) => {
        if (res?.data?.status_code === 200) {
          dispatch(
            cowAdoptionReqData(rowsPerPage, page + 1, searchResult, params?.id)
          );
        }
        setIsDelete(false);
      })
    );
  };

  useEffect(() => {
    dispatch(getCowBreedMasterDataAction());
  }, [dispatch]);

  const breedResult = useSelector(
    (store) => store.cowsbreedMasterDataReducer?.cowBreedData
  );
  const isBreedOptions = breedResult?.result?.data ?? [];

  return (
    <>
      <RegCowshedInformationTop
        headData={state}
        topData={result?.cowshedData}
      />
      <div className="wrapper_card">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{ borderBottom: "1px solid #EAEAEA" }}
          className="tab_main"
        >
          <Tab label={t("tab.cowshed_cow")} {...a11yProps(0)} />
          <Tab label={t("tab.adopted_cow")} {...a11yProps(1)} />
          <Tab label={t("tab.adopted_cow_request")} {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0} className="tabpanel_bx">
          <SerachFilter
            search={search}
            handleChangeSearch={handleChangeSearch}
            isBreedOptions={isBreedOptions}
            handleBreedChange={handleBreedChange}
            placeholder={t("table.bar_code")}
          />
          <CowshedCowTable
            rows={result?.cowList?.data}
            page={page}
            count={result?.cowList?.count ?? 0}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            message={message}
          />
        </TabPanel>
        <TabPanel value={value} index={1} className="tabpanel_bx">
          <SerachFilter
            search={search}
            handleChangeSearch={handleChangeSearch}
            isBreedOptions={isBreedOptions}
            handleBreedChange={handleBreedChange}
            placeholder={t("table.bar_code")}
          />
          <AdoptionCowTable
            rows={result?.cowList?.data}
            page={page}
            count={result?.cowList?.count ?? 0}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            message={message}
          />
        </TabPanel>
        <TabPanel value={value} index={2} className="tabpanel_bx">
          <SerachFilter
            search={search}
            handleChangeSearch={handleChangeSearch}
            isBreedOptions={isBreedOptions}
            handleBreedChange={handleBreedChange}
            placeholder={`${t("table.name")} , ${t("table.mob_no")} , ${t(
              "table.aadhar_no"
            )}`}
          />
          <AdoptionRequestTable
            rows={adopCowData?.result?.adoptRequestList?.data}
            page={page}
            count={adopCowData?.result?.adoptRequestList?.count ?? 0}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            message={message}
            handleDelete={handleDelete}
            setIsDelete={setIsDelete}
            isDelete={isDelete}
          />
        </TabPanel>
      </div>
    </>
  );
};

export default RegCowshedInformation;
