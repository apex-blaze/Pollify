import React from "react";
import { Fragment } from "react/cjs/react.production.min";
import Button from "./Button";
import ToggleSwitch from "./ToggleSwitch";

const CreatePoll = () => {
  return (
    <div className="mt-8 ">
      <div className="mx-2 px-2 md:px-8 md:mx-8 lg:px-16 lg:mx-28 text-left">
        <h1 className="text-purple-bright text-5xl my-4">Create Poll</h1>
        <h3 className="text-purple-moderate ">
          Fill out below fields to create a poll
        </h3>
        <form action="" className="">
          <label
            htmlFor="poll-qn"
            className="text-purple-bright block text-lg pl-1 pb-2 pt-5"
          >
            Poll Question
          </label>{" "}
          <textarea
            id="poll-qn"
            className="placeholder-purple-moderate form-input w-full rounded-lg p-5 border border-gray-400 resize-none text-xl"
            placeholder="What's your favourite colour?"
            spellCheck="false"
          />{" "}
          <br />
          <div
            className="flex flex-col justify-start items-start  
          md:flex-row md:justify-center md:items-center mt-4"
          >
            <div className="md:flex-1">
              <Button
                placeholder="Add option"
                icon={
                  <Fragment>
                    <i class="fas fa-plus-circle"></i>
                  </Fragment>
                }
              />
            </div>
            {/* <button className="form-input flex-1">Add another option</button> */}
            <div className=" md:ml-auto md:mr-4  md:flex">
              <p className="py-5 md:flex-1 md:px-6 text-purple-bright text-lg">
                Auto expire after a fixed time &nbsp;
                <ToggleSwitch />
              </p>
            </div>
          </div>
          <label
            htmlFor="option-1"
            className="text-purple-bright block text-lg pl-1 pb-2 pt-5"
          >
            Option 1
          </label>{" "}
          <input
            type="text"
            id="option-1"
            className="placeholder-purple-moderate form-input w-full rounded-lg p-5 border border-gray-400 text-xl"
            placeholder="Option 1"
          />{" "}
          <br />
          <label
            htmlFor="option-2"
            className="text-purple-bright block text-lg pl-1 pb-2 pt-5"
          >
            Option 2
          </label>
          <input
            type="text"
            id="option-2"
            className="placeholder-purple-moderate form-input w-full rounded-lg p-5  focus:shadow-outline border border-gray-400 text-xl"
            placeholder="Option 2"
          />{" "}
          <br />
          <div className="my-6 flex">
            <div className="flex-1">
              <Button
                placeholder="Generate Poll"
                icon={
                  <Fragment>
                    <i class="fas fa-rocket"></i>
                  </Fragment>
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePoll;
