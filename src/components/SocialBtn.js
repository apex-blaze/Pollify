import React from "react";

const SocialBtn = (props) => {
  return (
    <div className="py-3">
      <div
        className={`inline-flex cursor-pointer items-center  transition-all duration-150 px-2 py-2  text-white rounded-md`}
        style={{ backgroundColor: props.color }}
      >
        <div className="mr-2">{props.icon}</div>
        <button className="focus:outline-none pr-3">
          Share on {props.platform}
        </button>
      </div>
    </div>
  );
};

export default SocialBtn;
