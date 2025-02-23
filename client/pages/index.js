import React from "react";

const LandingPage = ({ color }) => {
  console.log(color);
  return <div className="bg-danger">index</div>;
};

LandingPage.getInitialProps = () => {
  console.log("LANDING PAGE!");
  return { color: "red" };
};

export default LandingPage;
