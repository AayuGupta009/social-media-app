import { useEffect } from "react";
import { useSelector } from "react-redux";
import MainRoute from "./router";
import Loader from "./utils/loader/Loader";
import i18n from "i18next";

const App = () => {
  const { isLoading } = useSelector((state) => state.loadingReducer);
  useEffect(() => {
    if (isLoading) {
      document.body.style.cursor = "wait";
    } else {
      document.body.style.cursor = "default";
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader visible={true} open={true} />}
      <MainRoute />
    </>
  );
};

export default App;
