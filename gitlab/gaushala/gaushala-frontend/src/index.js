import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { defaultTheme } from "./themes/default";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./assets/style/sass/all.scss";
import "./index.css";
import "./i18n";
const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <React.Suspense fallback={<div>Loading...</div>}>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.Suspense>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
