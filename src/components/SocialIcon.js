import React from "react";

const SocialIcon = (props) => {
  return (
    <div
      className={`flex transition-all duration-150 mr-3 rounded-md px-2 text-white items-center -ml-2 w-full self-center py-1`}
      style={{ backgroundColor: props.color }}
    >
      <a href="#" target="_blank" className={`text-white`}>
        {props.icon}
      </a>
    </div>
  );
};

export default SocialIcon;
