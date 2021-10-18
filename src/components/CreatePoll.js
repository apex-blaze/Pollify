import React from "react";

const CreatePoll = () => {
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
            <button className="form-input flex-1">Add another option</button>
            <button className="form-input flex-1">Generate Poll</button>
            <div id="auto-timer flex-1">
              <span>
                Auto expire after a fixed time{" "}
                <input type="checkbox" className="form-input" />
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePoll;
