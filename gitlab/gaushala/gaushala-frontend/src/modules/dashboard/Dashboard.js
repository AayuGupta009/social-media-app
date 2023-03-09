import React, { useEffect } from "react";
import ComplainChart from "./ComplainChart";
import CardBox from "./CardBox";
import "./dashboard.scss";
import DonationChart from "./DonationChart";
import { FormControl, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { dashboardAction } from "../../redux/action/dashboard/dashboardAction";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Calendar } from "../../assets/images/dashboard/calendar.svg";
import { useState } from "react";
import moment from "moment";
import {
  changesISODateToNormal,
  formatDate,
} from "../../utils/commonFunctions";

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(from);
  const dispatch = useDispatch();
  const [actionFromDate, setActionFromDate] = useState("");
  const [actionToDate, setActionToDate] = useState("");

  const handleChangeFrom = (newValue) => {
    const fromDate = newValue?.toISOString();
    console.log(fromDate, "fromDate");
    setFrom(fromDate);
  };

  const handleChangeTo = (newValue) => {
    const toDate = newValue?.toISOString();
    setTo(toDate);
  };
  useEffect(() => {
    dispatch(dashboardAction(from, to));
  }, [dispatch, from, to]);

  const { result } = useSelector((store) => store?.dashboard?.dashboardData);
  const donationData = result?.donationByMonth;
  const complaintCompletedData = result?.complaintCompleted;
  const complaintPendingData = result?.complaintPending;

  const donationSeries = [
    {
      name: `${t("dashboard.chart1")}`,
      data: donationData,
    },
  ];
  const complainSeries = [
    {
      name: `${t("dashboard.chart2")}`,
      data: complaintCompletedData,
    },
    {
      name: `${t("dashboard.chart2_b")}`,
      data: complaintPendingData,
    },
  ];
  return (
    <>
      <Grid
        container
        spacing={1}
        style={{ marginBottom: "3.1%", display: "flex", alignItems: "center" }}
      >
        <Grid item xs={12} md={2} lg={6}>
          <Typography variant="h4">{`${t("page_title.dashboard")}`}</Typography>
        </Grid>
        <Grid item xs={12} md={2} lg={1} style={{ textAlign: "right" }}>
          <Typography variant="body">{`${t("date_range.from")}`} :</Typography>
        </Grid>
        <Grid item xs={12} md={3} lg={2}>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs} format="dd/MM/yy">
              <DatePicker
                disableFuture
                components={{ OpenPickerIcon: Calendar }}
                views={["day"]}
                value={from}
                maxDate={new Date()}
                inputFormat="DD/MM/YYYY"
                onChange={handleChangeFrom}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      placeholder: "dd-mm-yyyy",
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2} lg={1} style={{ textAlign: "right" }}>
          <Typography variant="body">{`${t("date_range.to")}`} :</Typography>
        </Grid>
        <Grid item xs={12} md={3} lg={2}>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                components={{ OpenPickerIcon: Calendar }}
                views={["day"]}
                value={to}
                startDate={from}
                minDate={from}
                inputFormat="DD/MM/YYYY"
                onChange={handleChangeTo}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      placeholder: "dd-mm-yyyy",
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
      </Grid>
      <CardBox result={result} />
      <div className="chart_bx_1" style={{ marginTop: "2.5rem" }}>
        <DonationChart donationSeries={donationSeries} result={result} />
      </div>
      <div className="chart_bx_1" style={{ marginTop: "2.5rem" }}>
        <ComplainChart complainSeries={complainSeries} result={result} />
      </div>
    </>
  );
};

export default Dashboard;
