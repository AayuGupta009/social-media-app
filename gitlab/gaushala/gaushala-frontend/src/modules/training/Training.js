import React, { useState } from "react";
import "./training.scss";
import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import Video2 from "../../assets/videos/testVideo2.mp4";
import { ReactComponent as AddIcon } from "../../assets/images/plus-circle.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DotSvg } from "../../assets/images/gallery/3DotIcon.svg";
import { ReactComponent as DeleteSvg } from "../../assets/images/gallery/delete.svg";
import DropdownItem from "../../components/common/menu-item";
import CustomDialog from "../../components/common/Dialogue/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteVideoData,
  trainingManagementAction,
} from "../../redux/action/training/trainingManagementAction";

function Training() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
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

  const options = [
    {
      icon: <DeleteSvg />,
      value: `${t("action.delete")}`,
      onClick: () => {
        handleDelete();
      },
    },
  ];

  document.addEventListener(
    "play",
    function (e) {
      var videos = document.getElementsByTagName("video");
      for (var i = 0, len = videos.length; i < len; i++) {
        if (videos[i] !== e.target) {
          videos[i].pause();
        }
      }
    },
    true
  );

  useEffect(() => {
    dispatch(trainingManagementAction());
  }, [dispatch]);

  const { count, msg, videoData } = useSelector(
    (store) => store.trainingDataReducer
  );

  const handleDelete = () => {
    dispatch(
      deleteVideoData(imageid, () => {
        dispatch(trainingManagementAction());
      })
    );
  };
  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "2rem" }}>
        {t("page_title.TrainingManagement")}
      </Typography>
      <div className="wrapper_card">
        <div className="box_layout_training">
          <div className="training_main">
            <div className="training_wraper">
              <div className="button_bx">
                <div className="table_title">
                  <p>{t("page_title.training_vid")}</p>
                </div>
                <Button
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
                  onClick={() => navigate("/training-management/add-video")}
                >
                  {`${t("buttons.add_video")}`}
                </Button>
              </div>

              <Grid container spacing={4}>
                {videoData && videoData.length > 0 ? (
                  videoData.map((data, index) => {
                    return (
                      <Grid item xs={12} sm={6} lg={6} md={6}>
                        <Card>
                          <Box
                            component="div"
                            sx={{
                              p: "0.8rem",
                              border: "0.929665px solid #CDCDCD;",
                              borderRadius: "15px",
                            }}
                          >
                            <Grid container>
                              <Grid item md={12}>
                                <div
                                  className="image_bx"
                                  onClick={() => setOpens(true)}
                                >
                                  <video
                                    controls
                                    width="100%"
                                    height="100%"
                                    style={{ borderRadius: "15px" }}
                                  >
                                    <source
                                      src={data?.video}
                                      type="video/mp4"
                                    />
                                    Sorry, your browser doesn't support videos.
                                  </video>
                                  <div
                                    className="dot_icon"
                                    onClick={(e) => handleClick(e, data._id)}
                                  >
                                    <DotSvg />
                                  </div>
                                  <div className="overlay"></div>
                                </div>
                              </Grid>
                            </Grid>
                            <div className="card_bottom_text">
                              <Typography variant="h5">
                                {data?.title?.en ?? "NA"}
                              </Typography>
                              {/* <span>20 Jul 2022, 12:00PM</span> */}
                            </div>
                          </Box>
                        </Card>
                      </Grid>
                    );
                  })
                ) : (
                  <div>{msg ?? "NA"}</div>
                )}
              </Grid>
            </div>
          </div>
        </div>
      </div>
      {/* {opens && (
        <CustomDialog
          fullScreen={true}
          isOpen={opens}
          bodyChild={<img src={opens} alt={""} />}
          handleClose={() => setOpens("")}
          isClose={true}
          mainClass="fullscreen_image"
        />
      )} */}
      <DropdownItem
        options={options}
        open={open}
        handleClose={handleClose}
        anchorEl={anchorEl}
      />
    </>
  );
}

export default Training;
