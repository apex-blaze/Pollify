import React from "react";
import HomeImg from "../img/HomeImg.jpg";
const RightSection = () => {
  return (
    <div className="px-12 py-6 md:flex md:flex-1 md:w-min md:justify-center md:p-4 ">
      <img
        src={HomeImg}
        alt="Voting-vector-image"
        className="md:m-auto md:max-w-lg md:w-full"
      />
    </div>
  );
};

export default RightSection;
