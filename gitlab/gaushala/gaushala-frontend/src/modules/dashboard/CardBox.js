import { Grid } from "@mui/material";
import React from "react";
import { ReactComponent as UserSvg } from "../../assets/images/dashboard/user.svg";
import { ReactComponent as CowSvg } from "../../assets/images/dashboard/cow.svg";
import UnhealthyCowImg from "../../assets/images/dashboard/unhealthy-cow.png";
import ComplainImg from "../../assets/images/dashboard/complain.png";
import RupeeImg from "../../assets/images/dashboard/rupee.png";
import AdoptionImg from "../../assets/images/dashboard/adoption.png";
import AwarenessImg from "../../assets/images/dashboard/awareness.png";
import UserImg from "../../assets/images/dashboard/user.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CardBox = ({ result }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <div
            className="card_bx curser"
            onClick={() => navigate("/registered-gaushala-management")}
          >
            <div className="card_header">
              <p> {t("dashboard.card1")}</p>
            </div>
            <div className="card_icon">
              <div className="icon">
                <UserSvg />
              </div>
              <p>{result?.totalGaushala ?? 0}</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <div className="card_bx">
            <div className="card_header">
              <p>{t("dashboard.card2")}</p>
            </div>
            <div className="card_icon">
              <div className="icon">
                <CowSvg />
              </div>
              <p>{result?.totalCow}</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <div
            className="card_bx curser"
            onClick={() => navigate("/financial-management")}
          >
            <div className="card_header">
              <p>{t("dashboard.card3")}</p>
            </div>
            <div className="card_icon">
              <div className="icon">
                <img src={RupeeImg} alt={RupeeImg} />
              </div>
              <p>{result?.totalDonation ?? 0}</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <div
            className="card_bx curser"
            onClick={() => navigate("/complaints-management")}
          >
            <div className="card_header">
              <p>{t("dashboard.card4")}</p>
            </div>
            <div className="card_icon">
              <div className="icon">
                <img src={ComplainImg} alt="" />
              </div>
              <p>{result?.totalComplaint ?? 0}</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <div className="card_bx">
            <div className="card_header">
              <p>{t("dashboard.card5")}</p>
            </div>
            <div className="card_icon">
              <div className="icon">
                <img src={AdoptionImg} alt="" />
              </div>
              <p>{result?.totalAdoptedCow ?? 0}</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <div
            className="card_bx curser"
            onClick={() => navigate("/awareness-programmes")}
          >
            <div className="card_header">
              <p>{t("dashboard.card6")}</p>
            </div>
            <div className="card_icon">
              <div className="icon">
                <img src={AwarenessImg} alt={AwarenessImg} />
              </div>
              <p>{result?.awarenessPrograms ?? 0}</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <div
            className="card_bx curser"
            onClick={() => navigate("/user-management")}
          >
            <div className="card_header">
              <p>{t("dashboard.card7")}</p>
            </div>
            <div className="card_icon">
              <div className="icon">
                <img src={UserImg} alt={UserImg} />
              </div>
              <p>{result?.totalUser ?? 0}</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <div className="card_bx">
            <div className="card_header">
              <p> {t("dashboard.card8")}</p>
            </div>
            <div className="card_icon">
              <div className="icon">
                <img src={UnhealthyCowImg} alt={UnhealthyCowImg} />
              </div>
              <p>{result?.totalUnhealthyCow ?? 0}</p>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default CardBox;
