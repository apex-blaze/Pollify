import React from "react";
import HomeImg from "../img/HomeImg.jpg";
import Button from "./Button";

const LeftSection = () => {
  return (
    <div className="py-8 px-8">
      <h1 className="font-fred text-4xl py-6 px-4">
        Generate Realtime Polls Instantly !!
      </h1>
      <img src={HomeImg} alt="" />
      <div className="flex justify-center">
        <Button placeholder={"Get Started"} dimension={[3, 14]} />
      </div>
    </div>
  );
};

export default LeftSection;
