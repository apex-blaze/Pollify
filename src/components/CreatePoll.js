import React, { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import Button from "./Button";
import { Toggle, ListItem, List, Page } from "tailwind-mobile/react";

const CreatePoll = () => {
  const [checked1, setChecked1] = useState(true);
  return (
    <div className="mt-8 ">
      <div className="px-16 mx-28 text-left">
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
          <div className="my-4 flex">
            <div className="flex-1">
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
            <div className="flex-1">
              <Button
                placeholder="Generate Poll"
                icon={
                  <Fragment>
                    <i class="fas fa-rocket"></i>
                  </Fragment>
                }
              />
              {/* <button className="form-input flex-1">Generate Poll</button> */}
            </div>

            {/* -------------------------------------------------- */}

            <div id="auto-timer flex-1"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePoll;
