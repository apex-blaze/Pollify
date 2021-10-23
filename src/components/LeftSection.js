import React from "react";
import { Fragment } from "react/cjs/react.production.min";

import Button from "./Button";

const LeftSection = (props) => {
  const handleLogin = props.handleLogin;
  return (
    <div className="pt-10 pb-6 px-6 md:flex-1">
      <h1 className="font-fred text-4xl py-6 px-4 bg-brushed bg-cover bg-center">
        Generate Realtime Polls Instantly !!
      </h1>
      <div className="px-2 py-6 mt-4 text-xl leading-10 ">
        <ul className="list-none grid justify-items-start font-fred lg:pl-8">
          <li className="text-left">
            <i className="fas fa-paper-plane pr-2"></i> Track the polls in
            realtime
          </li>
          <li className="text-left">
            <i className="fas fa-paper-plane pr-2"></i> Set an auto expire timer
          </li>
          <li className="text-left">
            {" "}
            <i className="fas fa-paper-plane pr-2"></i> Instant share on
            platforms
          </li>
        </ul>
      </div>

      <div className="flex justify-center py-5 mb-4">
        <button
          onClick={handleLogin}
          className="py-2 px-2 md:px-5 md:py-3 font-medium text-white bg-purple-bright rounded hover:bg-purple-moderate transition duration-300"
        >
          {" "}
          <Fragment>
            <i className="fab fa-google px-2 "></i>
          </Fragment>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LeftSection;
