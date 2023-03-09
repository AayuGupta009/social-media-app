import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as AddIcon } from "../../assets/images/plus-circle.svg";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const GalleryHeader = ({ handleImageChange, handleSubmit, inputRef }) => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "3.1%",
        }}
        className="top_search_filter_bx"
      >
        <Typography variant="h4">
          {`${t("page_title.GalleryManagement")}`}{" "}
        </Typography>

        <label htmlFor="upload_image">
          <input
            hidden
            ref={inputRef}
            type="file"
            name="banner"
            id="banner"
            onChange={handleImageChange}
            // multiple
          />
          <Button
            component="span"
            variant="contained"
            startIcon={<AddIcon />}
            color="primary"
            sx={{
              borderRadius: "100px",
              height: "45px",
              width: { xs: "auto", lg: "100%" },
              fontWeight: "600",
              lineHeight: "45px",
            }}
            onClick={handleSubmit}
          >
            {`${t("buttons.add_new_pic")}`}
          </Button>
        </label>
      </Box>
    </>
  );
};

export default GalleryHeader;
