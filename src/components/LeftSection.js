import React from "react";
import Splatter from "../img/splatter.png";

import Button from "./Button";

const LeftSection = () => {
  return (
    <div className="py-10 px-6">
      <h1 className="font-fred text-4xl py-6 px-4 bg-brushed bg-cover bg-center">
        Generate Realtime Polls Instantly !!
      </h1>
      <div className="px-2 py-6 mt-4 text-xl leading-10 ">
        <ul className="list-none grid justify-items-start font-fred">
          <li className="text-left">
            <i class="fas fa-paper-plane pr-2"></i> Track the polls in realtime
          </li>
          <li className="text-left">
            <i class="fas fa-paper-plane pr-2"></i> Set an auto expire timer
          </li>
          <li className="text-left">
            {" "}
            <i class="fas fa-paper-plane pr-2"></i> Instant share on platforms
          </li>
        </ul>
      </div>

      <div className="flex justify-center py-5 mb-4">
        <Button placeholder={"Get Started"} dimension={[3, 14]} />
      </div>
    </div>
  );
};

export default LeftSection;
