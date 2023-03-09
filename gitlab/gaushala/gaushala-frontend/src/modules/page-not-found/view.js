import { useState } from "react";
import Box from "@mui/material/Box";

import NotFoundImage from "../../assets/images/404.svg";

const defaultState = {};

const PageNotFoundView = ({ title = "" }) => {
  const [state, setState] = useState(defaultState);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img alt="Not Found" src={NotFoundImage} height="400" width="400" />
      {title}
    </Box>
  );
};

export default PageNotFoundView;
