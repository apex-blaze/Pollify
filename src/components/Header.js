import React from "react";
import Logo from "./Logo";
import { GoogleLogin } from "../firebase/googleLogin";
import firebase from "firebase/compat/app";
import "firebase/auth";
import { UserSession } from "../firebase/UserProvider";

const Header = (props) => {
  const handleLogin = () => {
    console.log("heyo");
  };
  return (
    <>
      <div className="px-4">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <a href="#" className="flex items-center my-4 px-2">
                  <Logo />
                </a>
              </div>

              <div className="flex items-center space-x-3 ">
                <button
                  onClick={handleLogin}
                  className="py-2 px-2 md:px-5 md:py-3 font-medium text-white bg-purple-bright rounded hover:bg-purple-moderate transition duration-300"
                >
                  Sign In
                </button>
                <button className="hidden py-2 px-2 md:px-5 md:py-3 font-medium text-white bg-purple-bright rounded hover:bg-purple-moderate transition duration-300">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
