import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import SignInView from "./view";

const SignIn = () => {
  return (
    <>
      <Header />
      <SignInView />
    </>
  );
};

export default SignIn;
