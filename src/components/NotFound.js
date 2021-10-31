import React from "react";
import Lost from "../img/lost-in-space.png";
import Footer from "./Footer";
import Header from "./Header";

const NotFound = (props) => {
  const handleClick = () => {
    props.history.push(`/`);
  };
  return (
    <div className="lg:mx-20 flex flex-col min-h-screen">
      <Header />
      <div className="block my-auto">
        <div className="flex flex-col justify-center items-center md:flex-row">
          <div className="flex-1">
            <img className="block m-auto" src={Lost} alt="Lost in Space" />
          </div>
          <div className=" flex-1 text-left mb-5 mb:mb-0">
            <div className="mx-8 md:mx-4 lg:mx-9 ">
              <h1 className="text-5xl md:text-7xl font-bold my-4">404</h1>
              <h3 className="text-2xl md:text-4xl font-bold mb-2">
                UH OH! You're Lost
              </h3>
              <p className="text-md md:text-lg mb-4">
                The page you are looking for does not exist. How you got here is
                mystery. But you can click the button below to go back to the
                homepage.
              </p>
              <button
                className="bg-transparent hover:bg-purple-bright text-purple-bright font-semibold hover:text-white py-2 px-4 border-2 border-purple-bright hover:border-transparent rounded-md"
                onClick={handleClick}
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
