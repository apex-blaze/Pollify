import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { UserSession } from "../firebase/UserProvider";

const Poll = (props) => {
  const id = props.match.params.id;
  const uid = user.id;
  const { user } = UserSession();
  return (
    <div className="lg:mx-20 flex flex-col min-h-screen">
      <Header />

      <Footer />
    </div>
  );
};

export default Poll;
