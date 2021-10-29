import React from "react";

const LiveOption = (props) => {
  return (
    <div className="py-5 hover:shadow-2xl px-6 border-2 border-gray-200 rounded-md shadow-xl relative transition-all duration-500 bg-white mb-6">
      <div className="flex items-center">
        <span className="w-6 h-6 transition-all duration-200 rounded-full mr-5 border-2 border-gray-300"></span>
        <h2 className="text-2xl lg:text-3xl font-bold text-black ">
          {props.title}
        </h2>
      </div>
    </div>
  );
};

export default LiveOption;
