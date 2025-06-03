import React from "react";
import SignUpSection from "../components/SignUp/SignUpSection";
import Seo from "../components/Seo/Seo";

const Signup = () => {
  return (
    <>
      <Seo
        title="Sign Up | News Aggregator"
        description="Create a new account to stay updated with the latest news and personalized content."
        url="https://yourdomain.com/signup"
      />
      <div className="text-white h-screen w-screen flex justify-center items-center">
        <SignUpSection />
      </div>
    </>
  );
};

export default Signup;
