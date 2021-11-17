import React from "react";

const SocialBtn = (props) => {
  return (
    <div className="py-3">
      <div
        className={`inline-flex cursor-pointer items-center  transition-all duration-150  py-2 text-white rounded-md border`}
        style={{ backgroundColor: props.color }}
      >
        <div className="mr-2">{props.icon}</div>
      </div>
    </div>
  );
};

export default SocialBtn;
