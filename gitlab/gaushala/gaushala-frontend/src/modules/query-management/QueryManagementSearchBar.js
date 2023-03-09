import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as SearchIcon } from "../../assets/images/Search.svg";
import { ReactComponent as FilterIcon } from "../../assets/images/Vector.svg";
import DropdownItem from "../../components/common/menu-item";
import { ReactComponent as EditIcon } from "../../assets/images/edit-2.svg";
import { ReactComponent as TrashIcon } from "../../assets/images/trash.svg";

const QueryManagementSearchBar = ({ search, handleChangeSearch }) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Grid
        container
        spacing={1}
        style={{ marginBottom: "3.1%", display: "flex", alignItems: "center" }}
      >
        <Grid item xs={12} md={8}>
          <div className="table_title">
            <p>{t("page_title.query_list")}</p>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <OutlinedInput
            id="search"
            value={search}
            type="text"
            onChange={handleChangeSearch}
            placeholder={`${t("table.name")} , ${t("table.mob_no")} , ${t(
              "table.email"
            )}`}
            sx={{
              height: "45px !important",
              borderRadius: "40px !important",
              paddingLeft: "1.2rem",
            }}
            startAdornment={
              <InputAdornment position="start">
                <IconButton edge="start">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

export default QueryManagementSearchBar;
