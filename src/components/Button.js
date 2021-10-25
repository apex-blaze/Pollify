import React from "react";

const Button = (props) => {
  return (
    <div className="flex  items-center space-x-3 ">
      <button
        className="py-3 px-14 md:py-4 md:px-18  font-medium text-white bg-purple-bright rounded hover:bg-purple-moderate transition duration-300"
        onClick={(e) => e.preventDefault()}
      >
        {props.icon} {props.placeholder}
      </button>
    </div>
  );
};

export default Button;
