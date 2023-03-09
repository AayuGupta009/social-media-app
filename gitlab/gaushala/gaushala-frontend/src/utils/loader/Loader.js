import { Backdrop } from "@mui/material";
import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader = ({ open, visible }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <ThreeCircles
        height="100"
        width="100"
        color="#AA7D54"
        wrapperStyle={{}}
        wrapperClass=""
        visible={visible}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor="#d9ad84"
        middleCircleColor="#e1c7ae"
      />
    </Backdrop>
  );
};

export default Loader;
