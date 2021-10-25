import React from "react";
import CreatePoll from "./CreatePoll";
import Footer from "./Footer";
import Header from "./Header";

const Home = (props) => {
  // console.log(props);
  return (
    <>
      <div className="lg:mx-20 flex flex-col min-h-screen">
        <Header />
        <CreatePoll />
        <Footer />
      </div>
    </>
  );
};

export default Home;
