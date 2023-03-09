import { CardMedia, Grid, TablePagination, TableRow } from "@mui/material";
import React from "react";
import { ReactComponent as DotSvg } from "../../assets/images/gallery/3DotIcon.svg";
import { ReactComponent as DeleteSvg } from "../../assets/images/gallery/delete.svg";
import CustomDialog from "../../components/common/Dialogue/index";
import DropdownItem from "../../components/common/menu-item";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const GalleryBox = ({
  dataResult,
  page,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage,
  count,
  handleDelete,
  setImageId,
  message,
  anchorEl,
  setAnchorEl,
}) => {
  const [opens, setOpens] = useState("");
  const open = Boolean(anchorEl);
  const { t, i18n } = useTranslation();
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setImageId(id);
    event.stopPropagation();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = [
    {
      icon: <DeleteSvg />,
      value: `${t("action.delete")}`,
      onClick: () => {
        handleDelete();
      },
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        {dataResult && dataResult.length > 0 ? (
          dataResult.map((data, index) => {
            return (
              <>
                <Grid item md={6} lg={4} xs={12} sm={6} key={data._id}>
                  <div
                    className="image_bx"
                    onClick={() => setOpens(data.image)}
                  >
                    <CardMedia
                      component="img"
                      height="300"
                      image={data.image}
                      alt={data.image}
                      style={{ borderRadius: "12px" }}
                    />
                    <div
                      className="dot_icon"
                      onClick={(e) => handleClick(e, data._id)}
                    >
                      <DotSvg />
                    </div>
                    <div className="overlay"></div>
                  </div>
                </Grid>
              </>
            );
          })
        ) : (
          <Grid item md={12} lg={12} xs={12} style={{ textAlign: "center" }}>
            {message}
          </Grid>
        )}
      </Grid>
      <TablePagination
        rowsPerPageOptions={[9, 27, 100]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={`${t("pagination_label.show")}`}
      />
      {opens && (
        <CustomDialog
          fullScreen={true}
          isOpen={opens}
          bodyChild={<img src={opens} alt={""} />}
          handleClose={() => setOpens("")}
          isClose={true}
          mainClass="fullscreen_image"
        />
      )}
      <DropdownItem
        options={options}
        open={open}
        handleClose={handleClose}
        anchorEl={anchorEl}
      />
    </>
  );
};

export default GalleryBox;
