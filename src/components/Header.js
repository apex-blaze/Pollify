import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Logo from "./Logo";
import { GoogleLogin } from "../firebase/googleLogin";
import firebase from "firebase/compat/app";
import "firebase/auth";
import { UserSession } from "../firebase/UserProvider";

const Header = (props) => {
  const { user, loading } = UserSession();
  const handleLogin = props.handleLogin;
  const handleLogout = async () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        props.history.push("/auth");
        // console.log("Successfully logged out");
      })
      .catch((err) => {
        console.log(err);
      });
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
                  className={`${
                    user ? "hidden" : " "
                  } py-2 px-2 md:px-5 md:py-3 font-medium text-white bg-purple-bright rounded hover:bg-purple-moderate transition duration-300`}
                >
                  Sign In
                </button>
                <button
                  onClick={handleLogout}
                  className={`${
                    user ? " " : "hidden"
                  } py-2 px-2 md:px-5 md:py-3 font-medium text-white bg-purple-bright rounded hover:bg-purple-moderate transition duration-300`}
                >
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

export default withRouter(Header);
