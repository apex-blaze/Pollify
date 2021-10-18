import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const Home = () => {
  return (
    <div className="lg:mx-20 md:flex md:flex-col md:min-h-screen">
      <Header />
      <div className="md:flex md:py-2 md:flex-grow-1">
        <LeftSection />
        <RightSection />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
