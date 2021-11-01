import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { UserSession } from "../firebase/UserProvider";
import Loader from "../img/Preloader.gif";

const Auth = (props) => {
  // console.log(props);
  const { user, loading } = UserSession();
  const handleLogin = async () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // let token = result.credential.accessToken;
        // let user = result.user;
        if (props.location.state) {
          if (!props.location.state.from) {
            props.history.push("/auth");
          } else {
            props.history.push(`/${props.location.state.from}`);
          }
        } else {
          props.history.push("/");
        }
      })
      .catch((err) => {
        // let errorCode = err.code;
        // let errorMessage = err.message;
        // let email = err.email;
        // let credential = err.credential;
      });
  };

  useEffect(() => {
    if (user) {
      if (props.location.state) {
        if (!props.location.state.from) props.history.push("/");
        else props.history.push(`/${props.location.state.from}`);
      } else {
        props.history.push("/");
      }
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <div className="w-full flex h-screen items-center justify-center z-50">
          <img src={Loader} />
        </div>
      ) : (
        <div className="lg:mx-20 md:flex md:flex-col md:min-h-screen">
          <Header handleLogin={handleLogin} />
          <div className="md:flex md:py-2 md:flex-grow-1">
            <LeftSection handleLogin={handleLogin} />
            <RightSection />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Auth;
