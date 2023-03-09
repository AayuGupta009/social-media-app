import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { Grid } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import Video2 from "../../assets/videos/testVideo2.mp4";
import { ReactComponent as DotSvg } from "../../assets/images/gallery/3DotIcon.svg";
import { ReactComponent as DeleteSvg } from "../../assets/images/gallery/delete.svg";
import DropdownItem from "../../components/common/menu-item";
import CustomDialog from "../../components/common/Dialogue/index";

const TrainingVideoCard = () => {
  const [opens, setOpens] = useState("");
  const [imageid, setImageId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setImageId(id);
    event.stopPropagation();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    // dispatch(
    //   deleteGalleryData(imageid, () => {
    //     dispatch(getGalleryLIstData());
    //   })
    // );
  };
  const options = [
    {
      icon: <DeleteSvg />,
      value: "डिलीट करे",
      onClick: () => {
        handleDelete();
      },
    },
  ];

  return (
    <>
      <Card>
        <Box component="div" sx={{ p: "0.7rem" }}>
          <Grid container>
            <Grid item md={12}>
              <div className="image_bx" onClick={() => setOpens(true)}>
                <video
                  controls
                  width="100%"
                  height="100%"
                  style={{ borderRadius: "15px" }}
                >
                  <source src={Video2} type="video/mp4" />
                  Sorry, your browser doesn't support videos.
                </video>
                <div className="dot_icon" onClick={(e) => handleClick()}>
                  <DotSvg />
                </div>
                <div className="overlay"></div>
              </div>
            </Grid>
          </Grid>
          <div className="card_bottom_text">
            <Typography variant="h5">
              व्यवस्थापक पोर्टल का उपयोग कैसे कर सकता है
            </Typography>
            {/* <span>20 Jul 2022, 12:00PM</span> */}
          </div>
        </Box>
      </Card>
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

export default TrainingVideoCard;
