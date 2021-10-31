import React from "react";

const SocialIcon = (props) => {
  return (
    <div className="flex items-center -ml-2 w-full">
      <a href="#" target="_blank" className={`text-${props.color}`}>
        {props.icon}
      </a>
    </div>
  );
};

export default SocialIcon;
