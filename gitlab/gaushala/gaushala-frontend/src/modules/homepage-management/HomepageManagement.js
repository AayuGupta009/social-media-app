import { Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Banner from "./banner/Banner";
import Blogs from "./blog/Blogs";
import News from "./news/News";
import { useEffect } from "react";
// import "./reg_gaushala.scss";

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
const HomepageManagement = () => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(0);

  // useEffect(() => {
  //   const activeTab = localStorage.getItem("activeTabHomepage");
  //   if (activeTab) {
  //     setValue(parseInt(activeTab));
  //   }
  // }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("activeTabHomepage", newValue);
  };

  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "2rem" }}>
        {`${t("page_title.homepage_manmnt")}`}
      </Typography>
      <div className="wrapper_card">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{ borderBottom: "1px solid #EAEAEA" }}
          className="tab_main"
        >
          `$`
          <Tab label={t("tab.banner_m")} {...a11yProps(0)} />
          <Tab label={t("tab.blog_m")} {...a11yProps(1)} />
          <Tab label={t("tab.news_m")} {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0} className="tabpanel_bx">
          <Banner />
        </TabPanel>
        <TabPanel value={value} index={1} className="tabpanel_bx">
          <Blogs />
        </TabPanel>
        <TabPanel value={value} index={2} className="tabpanel_bx">
          <News />
        </TabPanel>
      </div>
    </>
  );
};

export default HomepageManagement;
