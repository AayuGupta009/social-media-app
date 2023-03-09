import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Backdrop, Button, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ReactComponent as UserSvg } from "../../../assets/images/profile.svg";
import { ReactComponent as LogoLabelSvg } from "../../../assets/images/logo-label.svg";
import { ReactComponent as DarrowSvg } from "../../../assets/images/chevron-down.svg";
import { ReactComponent as LogoutSvg } from "../../../assets/images/logout.svg";
import "./style.scss";
import ProfileImg from "../../../assets/images/Base.png";
import LogoImg from "../../../assets/images/Frame.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/action/auth/authAction";
import { useEffect } from "react";
import { axiosInstance, updateLanguageHeader } from "../../../services/api";
import { useState } from "react";

const drawerWidth = "400px";
const drawerWidth2 = "260px";

function DashboardView({ listItems = [], window, children = <></> }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActiveItem = (itemRoute, child) => {
    let isActive = false;
    let childPath;
    const basePath = currentPath
      .split("/")
      .slice(0, itemRoute.split("/").length)
      .join("/");

    if (child) {
      childPath = child.map((ele) => ele.to);
    }
    if (
      basePath === itemRoute ||
      basePath === `${itemRoute}/` ||
      childPath?.includes(basePath)
    ) {
      isActive = true;
    }
    return isActive;
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const headerName = localStorage.getItem("EMAIL");
  const drawer = (
    <div>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          // justifyContent: !open ? "flex-end" : "space-between",
          px: { sm: [2], md: [3] },
          py: [1],
          mt: 4,
        }}
      >
        <IconButton>
          <div className="main_logo">
            {/* <LogoSvg /> */}
            <img src={LogoImg} alt="logo" />
            <LogoLabelSvg />
          </div>
        </IconButton>
      </Toolbar>
      <List
        component="nav"
        sx={{
          mt: { xs: ".5", md: "1.2rem" },
          display: "flex",
          flexDirection: "column",
          alignItems: { sm: "inherit", md: "center" },
        }}
      >
        {listItems?.map((item) => {
          return (
            <ListItem
              sx={{
                width: { xs: "100%", md: "92%" },
                paddingRight: { xs: "0px" },
                display: "flex",
                justifyContent: "flex-start",
                m: { xs: 0.5, md: 1.5 },
                cursor: "pointer",
                paddingLeft: { md: "1.8rem" },
              }}
              onClick={() => {
                handleDrawerToggle();
                navigate(`${item.to}`);
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  p: "2px",
                  color: isActiveItem(item.to, item.child) && "secondary.main",
                }}
              >
                {item.label}
              </Typography>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // updateLanguageHeader(lng);
  };

  // useEffect(() => {
  //   updateLanguageHeader(language);
  // }, [language]);

  return (
    <Box sx={{ backgroundColor: "#F5F5F5" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          borderBottom: "1px solid #D2D2D2",
          height: { sm: "75px", md: "99px" },
          backgroundColor: "#fff",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", md: "end" },
            height: { sm: "75px", md: "99px" },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: "none" },
              color: "#AA7D54",
            }}
          >
            <MenuIcon style={{ fontSize: "3rem" }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              mr: "3%",
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" }, color: "#111" }}>
              <Button
                // eventKey="en"
                onClick={() => changeLanguage("en")}
                style={{
                  color: `${i18n.resolvedLanguage != "en" ? "#ccc" : "#111"}`,
                }}
              >
                {t("langauage.english")}
              </Button>
              |
              <Button
                // eventKey="hi"
                onClick={() => changeLanguage("hi")}
                style={{
                  color: `${i18n.resolvedLanguage != "hi" ? "#ccc" : "#111"}`,
                }}
              >
                {t("langauage.hindi")}
              </Button>
            </Box>
            <div className="profile_bx" onClick={handleMenuClick}>
              <div className="profile_icon">
                <UserSvg src={ProfileImg} sx={{ cursor: "pointer" }} />
              </div>
              <div className="profile_name">
                <p>{headerName}</p>
                <DarrowSvg />
              </div>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth2,
              backgroundColor: "#AA7D54",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#AA7D54",
            },
          }}
          className="web_drawer"
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: "4% 3% 3% 3%",
          // width: { lg: `calc(100% - ${drawerWidth2})` },
          marginLeft: { md: drawerWidth },
        }}
      >
        <Toolbar />
        {children}
      </Box>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              background: "#fff",
              borderRadius: "15px",
            },
          }}
        >
          <MenuItem
            onClick={handleLogout}
            sx={{ minWidth: "185px", background: "white", padding: "1rem" }}
          >
            <ListItemIcon>
              <LogoutSvg />
            </ListItemIcon>
            <ListItemText>{t("langauage.logout")}</ListItemText>
          </MenuItem>
        </Menu>
      </Backdrop>
    </Box>
  );
}

export default DashboardView;
