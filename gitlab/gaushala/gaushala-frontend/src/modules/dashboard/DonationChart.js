import React from "react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";

const DonationChart = ({ donationSeries, result }) => {
  const { t, i18n } = useTranslation();

  var options = {
    colors: ["#AA7D54"],
    chart: {
      type: "bar",
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        colors: {
          backgroundBarColors: ["white"],
          backgroundBarRadius: 4,
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    xaxis: {
      categories: [
        `${t("dashboard.jan")}`,
        `${t("dashboard.feb")}`,
        `${t("dashboard.mar")}`,
        `${t("dashboard.apr")}`,
        `${t("dashboard.may")}`,
        `${t("dashboard.jun")}`,
        `${t("dashboard.july")}`,
        `${t("dashboard.aug")}`,
        `${t("dashboard.sep")}`,
        `${t("dashboard.oct")}`,
        `${t("dashboard.nov")}`,
        `${t("dashboard.dec")}`,
      ],
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + "k";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      show: false,
    },
    title: {
      text: `${t("dashboard.chart1")}`,
      align: "left",
      margin: 10,
      offsetX: 10,
      offsetY: 10,
      floating: false,
      style: {
        fontWeight: "600",
        fontSize: "26px",
        lineHeight: "39px",
        fontFamily: "Poppins",
        letterSpacing: "0.25px",
        width: "200px",
        color: "#000000",
      },
    },
    subtitle: {
      text: `${result?.totalDonation ?? 0}`,
      align: "left",
      offsetX: 10,
      offsetY: 45,
      floating: false,
      style: {
        fontSize: "26px",
        fontWeight: "600",
        fontFamily: "Poppins",
        color: "#323C4D",
        lineHeight: "48px",
      },
    },
    tooltip: {
      enabled: true,
    },
  };

  return (
    <>
      <ReactApexChart
        options={options}
        series={donationSeries}
        type="bar"
        height={350}
      />
    </>
  );
};

export default DonationChart;
