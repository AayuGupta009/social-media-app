import { useState } from "react";
import PageNotFoundView from "./view";

const defaultState = {
  title: "Page not found page"
};
const PageNotFound = () => {
  const [state, setState] = useState(defaultState);

  return (
    <PageNotFoundView
      title={state.title}
    />
  );
};

export default PageNotFound;
