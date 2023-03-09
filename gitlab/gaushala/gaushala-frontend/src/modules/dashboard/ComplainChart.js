import React from "react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";

const ComplainChart = ({ complainSeries, result }) => {
  const { t, i18n } = useTranslation();

  var options = {
    colors: ["#AA7D54", "#ffffff"],
    chart: {
      type: "bar",
      stacked: true,
      stackType: "100%",
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        borderRadius: 4,
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
          return value;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      offsetX: 800,
      offsetY: -130,
    },
    title: {
      text: `${t("dashboard.chart2_c")}`,
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
      text: `${result?.totalComplaint ?? 0}`,
      align: "left",
      offsetX: 10,
      offsetY: 45,
      floating: false,
      style: {
        fontSize: "26px",
        fontWeight: "600",
        fontFamily: "Poppins",
        lineHeight: "48px",
        color: "#323C4D",
      },
    },
  };

  return (
    <>
      <ReactApexChart
        options={options}
        series={complainSeries}
        type="bar"
        height={350}
      />
    </>
  );
};

export default ComplainChart;
