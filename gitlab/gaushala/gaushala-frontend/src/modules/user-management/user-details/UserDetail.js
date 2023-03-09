import { Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useState } from "react";
// import "../../";
import UserDetailTop from "./UserDetailTop";
import UserDonationTable from "./user-tabs/user-donation-detail/UserDonationTable";
import UserComplaintTable from "./user-tabs/user-complaint-detail/UserComplaintTable";
import UserVolAppnTable from "./user-tabs/user-vol-applicant-detail/UserVolAppnTable";
import UserVenAppnTable from "./user-tabs/user-ven-applicant-detail/UserVenAppnTable";
import UserAdoptionReqTable from "./user-tabs/user-adoption-request/UserAdoptionReqTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../../customHooks";
import {
  userAdopDataAction,
  userComplainAction,
  userDonationAction,
  userVenDataAction,
  userVolDataAction,
} from "../../../redux/action/user-management/user-details/userDetailsAction";
import { useLocation, useParams } from "react-router-dom";
import SerachFilter from "./user-tabs/user-adoption-request/SerachFilter";
import Search from "./user-tabs/user-complaint-detail/Search";
import { getCowBreedMasterDataAction } from "../../../redux/action/master-data/getCowBreedMasterDataAction";
import { getComplainTypeDataActions } from "../../../redux/action/master-data/getComplainTypeDataActions";

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
const UserDetail = () => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const searchResult = useDebounce(search, 1000);
  const dispatch = useDispatch();
  const params = useParams();
  const { state } = useLocation();
  const [filterId, setFilterId] = useState([]);

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
  const handleFilterChange = (e) => {
    if (e.target.checked) {
      const selectId = e.target.id;
      setFilterId((filterId) => [...filterId, selectId]);
    }
  };
  const userComplainPaload = {
    userId: params?.id,
    complaintType: filterId,
    search: searchResult,
    page: page + 1,
    size: rowsPerPage,
  };

  const userAdopReqPaload = {
    userId: params?.id,
    cowBreed: filterId,
    search: searchResult,
    page: page + 1,
    size: rowsPerPage,
  };
  useEffect(() => {
    value === 0
      ? dispatch(
          userDonationAction(rowsPerPage, page + 1, searchResult, params?.id)
        )
      : value === 1
      ? dispatch(userComplainAction(userComplainPaload))
      : value === 2
      ? dispatch(
          userVolDataAction(rowsPerPage, page + 1, searchResult, params?.id)
        )
      : value === 3
      ? dispatch(
          userVenDataAction(rowsPerPage, page + 1, searchResult, params?.id)
        )
      : dispatch(userAdopDataAction(userAdopReqPaload));
  }, [value, dispatch, rowsPerPage, page, searchResult, params?.id, filterId]);

  const donationData = useSelector(
    (store) => store.userDonationReducer?.userDonationData
  );
  const volData = useSelector((store) => store.userVolReqReducer?.userVolData);
  const complaintData = useSelector(
    (store) => store.userComplaintReducer?.userCompData
  );
  const venData = useSelector((store) => store.userVenReqReducer?.userVenData);
  const adopReqData = useSelector(
    (store) => store.userAdopReqReducer?.userAdopData
  );

  // cow breed type filter
  useEffect(() => {
    dispatch(getCowBreedMasterDataAction());
  }, [dispatch]);

  const { result } = useSelector(
    (store) => store.cowsbreedMasterDataReducer?.cowBreedData
  );
  const isBreedOptions = result?.data ?? [];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // complain type filter
  useEffect(() => {
    if (value === 1) {
      dispatch(getComplainTypeDataActions());
    }
  }, [dispatch, value]);

  const complainType = useSelector(
    (store) => store.complainTypeReducer?.complainTypeData
  );

  return (
    <>
      <UserDetailTop data={state} />
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
          className="tab_main tab_user"
        >
          <Tab label={t("tab.last_deonation")} {...a11yProps(0)} />
          <Tab label={t("tab.complaints")} {...a11yProps(1)} />
          <Tab label={t("tab.vol_appn")} {...a11yProps(2)} />
          <Tab label={t("tab.ven_appn")} {...a11yProps(3)} />
          <Tab label={t("tab.adopt_req")} {...a11yProps(4)} />
        </Tabs>
        <TabPanel value={value} index={0} className="tabpanel_bx">
          <Search
            search={search}
            handleChangeSearch={handleChangeSearch}
            placeholder={`${t("table.to_donate")} , ${t("table.doner_name")}`}
          />
          <UserDonationTable
            rows={donationData?.result?.data}
            page={page}
            count={donationData?.result?.count ?? 0}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            message={donationData?.message}
          />
        </TabPanel>
        <TabPanel value={value} index={1} className="tabpanel_bx">
          <SerachFilter
            search={search}
            handleChangeSearch={handleChangeSearch}
            placeholder={`${t("table.com_name")} , ${t("table.gaushala")}`}
            complainOptions={complainType?.result?.data ?? []}
            value={value}
            handleFilterChange={handleFilterChange}
          />
          <UserComplaintTable
            rows={complaintData?.result?.data}
            page={page}
            count={complaintData?.result?.count ?? 0}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            message={complaintData?.message}
          />
        </TabPanel>
        <TabPanel value={value} index={2} className="tabpanel_bx">
          <Search
            search={search}
            handleChangeSearch={handleChangeSearch}
            placeholder={` ${t("table.gaushala")} , ${t(
              "table.need_application"
            )}`}
          />
          <UserVolAppnTable
            rows={volData?.result?.data}
            page={page}
            count={volData?.result?.count ?? 0}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            message={volData?.message}
          />
        </TabPanel>
        <TabPanel value={value} index={3} className="tabpanel_bx">
          <Search
            search={search}
            handleChangeSearch={handleChangeSearch}
            placeholder={` ${t("table.gaushala")} , ${t(
              "table.need_application"
            )}`}
          />
          <UserVenAppnTable
            rows={venData?.result?.data}
            page={page}
            count={venData?.result?.count ?? 0}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            message={venData?.message}
          />
        </TabPanel>
        <TabPanel value={value} index={4} className="tabpanel_bx">
          <SerachFilter
            search={search}
            handleChangeSearch={handleChangeSearch}
            isBreedOptions={isBreedOptions}
            handleFilterChange={handleFilterChange}
            placeholder={t("table.name")}
          />
          <UserAdoptionReqTable
            rows={adopReqData?.result?.data}
            page={page}
            count={adopReqData?.result?.count ?? 0}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            message={adopReqData?.message}
          />
        </TabPanel>
      </div>
    </>
  );
};

export default UserDetail;
