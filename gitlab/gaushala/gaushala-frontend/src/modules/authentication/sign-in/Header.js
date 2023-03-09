import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useTranslation } from "react-i18next";
import "../auth.scss";
import { Button } from "@mui/material";
export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        style={{
          padding: 20,
          background: "transparent",
          border: 0,
          boxShadow: "none",
          zIndex: "1000000000",
        }}
      >
        <Toolbar>
          <img
            src="gaushala logo.svg"
            alt="gaushala logo"
            width={300}
            className="white_logo"
          />
          {/* <img src="gaushala_black.svg" width={150} className="black_logo" /> */}
          <Box sx={{ flexGrow: 1 }}>
            <div className="tet1">
              <p style={{ textAlign: "right", color: "#111" }}>
                {" "}
                <Button>
                  <span
                    style={{
                      color: `${
                        i18n.resolvedLanguage != "en" ? "#ccc" : "#111"
                      }`,
                    }}
                    // eventKey="en"
                    onClick={() => changeLanguage("en")}
                  >
                    {" "}
                    {t("langauage.english")}
                  </span>
                </Button>
                |
                <Button>
                  <span
                    onClick={() => changeLanguage("hi")}
                    style={{
                      color: `${
                        i18n.resolvedLanguage != "hi" ? "#ccc" : "#111"
                      }`,
                      curser: "pointer",
                    }}
                  >
                    {" "}
                    {t("langauage.hindi")}
                  </span>
                </Button>
              </p>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
