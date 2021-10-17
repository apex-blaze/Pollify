import React from "react";
import Header from "./Header";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="md:flex md:py-2">
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
};

export default Home;
