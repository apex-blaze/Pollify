import React from "react";

const LiveOption = (props) => {
  const handleClick = () => {
    props.setIndex(props.idx);
    // console.log(props.index);
  };
  return (
    <div
      className={` py-5 hover:shadow-2xl px-6 border-2 border-gray-200 rounded-md shadow-xl relative transition-all duration-500 bg-white w-full mb-6 ${
        props.idx === props.index
          ? `shadow-sam border-purple-bright ml-3 -mr-3`
          : ``
      } `}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <span
          className={`w-6 h-6 transition-all duration-200 rounded-full mr-5 border-2 border-gray-300 ${
            props.idx === props.index
              ? `bg-purple-bright border-purple-bright`
              : ``
          }`}
        ></span>
        <h2 className="text-2xl lg:text-3xl font-bold text-black ">
          {props.title}
        </h2>
      </div>
    </div>
  );
};

export default LiveOption;
