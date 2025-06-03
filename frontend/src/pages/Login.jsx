import React from "react";
import LoginSection from "../components/Login/LoginSection";
import Seo from "../components/Seo/Seo";

const Login = () => {
  return (
    <>
      <Seo
        title="Login | News Aggregator"
        description="Login to access personalized news and features on News Aggregator."
        url="https://yourdomain.com/login"
      />
      <div className="text-white h-screen w-screen flex justify-center items-center">
        <LoginSection />
      </div>
    </>
  );
};

export default Login;
