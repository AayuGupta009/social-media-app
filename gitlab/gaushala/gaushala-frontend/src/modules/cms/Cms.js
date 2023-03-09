import { Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Contact from "./Contact";
import Faq from "./faq/Faq";
import { useEffect } from "react";
import { cmsDataAction } from "../../redux/action/cms/getCmsDataAction";
import { useDispatch, useSelector } from "react-redux";
import About from "./About";
import TermsConditions from "./TermsConditions";
import PrivacyPolicy from "./PrivacyPolicy";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Cms = () => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 0) {
      dispatch(cmsDataAction(0));
    } else if (value === 1) {
      dispatch(cmsDataAction(2));
    } else if (value === 2) {
      dispatch(cmsDataAction(3));
    } else if (value === 3) {
      dispatch(cmsDataAction(1));
    }
  }, [dispatch, value]);

  const { cmsData } = useSelector((store) => store.cmsDataReducer);
  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "2rem" }}>
        {`${t("page_title.CmsManagement")}`}
      </Typography>
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
          <Tab label={t("tab.about")} {...a11yProps(0)} />
          <Tab label={t("tab.contact")} {...a11yProps(1)} />
          <Tab label={t("tab.rules")} {...a11yProps(2)} />
          <Tab label={t("tab.privacy")} {...a11yProps(3)} />
          <Tab label={t("tab.faq")} {...a11yProps(4)} />
        </Tabs>
        <TabPanel value={value} label="about" index={0} className="tabpanel_bx">
          <About cmsData={cmsData ?? ""} />
        </TabPanel>
        <TabPanel
          value={value}
          label="contact-us"
          index={1}
          className="tabpanel_bx"
        >
          <Contact cmsData={cmsData ?? ""} />
        </TabPanel>
        <TabPanel
          value={value}
          label="terms-and-conditions"
          index={2}
          className="tabpanel_bx"
        >
          <TermsConditions cmsData={cmsData ?? ""} />
        </TabPanel>
        <TabPanel
          value={value}
          label="privacy-policy"
          index={3}
          className="tabpanel_bx"
        >
          <PrivacyPolicy cmsData={cmsData ?? ""} />
        </TabPanel>
        <TabPanel value={value} label="faq" index={4} className="tabpanel_bx">
          <Faq />
        </TabPanel>
      </div>
    </>
  );
};

export default Cms;
