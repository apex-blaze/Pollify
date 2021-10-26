import React, { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import Button from "./Button";
import ToggleSwitch from "./ToggleSwitch";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import shortid from "shortid";
import { UserSession } from "../firebase/UserProvider";

const CreatePoll = (props) => {
  const { user } = UserSession();
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([
    {
      index: 1,
      title: "",
      count: 0,
    },
    {
      index: 2,
      title: "",
      count: 0,
    },
  ]);
  const [check, setCheck] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChange = (index, e) => {
    let arr = options;
    arr.forEach((option) => {
      if (option.index === index) {
        option.title = e.target.value;
      }
    });
    setOptions([...arr]);
  };

  const handleAdd = (e) => {
    let option = {
      index: options.length + 1,
      title: "",
      count: 0,
    };
    if (options.length === 5) {
      toast.warning("Maximum 5 options are allowed!!");
    } else {
      setOptions([...options, option]);
    }
  };

  const handleDelete = (index) => {
    if (options.length === 2) {
      toast.warning("Minimum 2 options are required!!");
      return;
    }

    let arr = options.map((option) => Object.assign({}, option));
    console.log(arr);
    let x = [];
    arr.forEach((option) => {
      if (option.index !== index) {
        console.log(option.index, index);
        console.log(option.title);
        x.push(option);
      }
    });
    arr = x;
    let i = 1;

    arr.forEach((option) => {
      option.index = i;
      i++;
    });
    console.log(arr);
    setOptions(arr);
  };

  const handleSubmit = (e) => {
    if (options.length < 2) {
      toast.error("Minimum 2 options are required!!");
    } else {
      let flag = 0;
      for (let i = 0; i < options.length; i++) {
        if (options[i].title === "") {
          toast.error("Option can't be empty!!");
          flag = 1;
          break;
        }
      }
      if (flag === 0) {
        if (title === "") {
          toast.error("Poll Question can't be empty!!");
          flag = 1;
        } else {
          let poll = {};
          if (check) {
            poll.expire = true;
            poll.date = selectedDate;
          } else {
            poll.expire = false;
          }
          poll.id = shortid.generate();
          poll.title = title;
          poll.creator = user.displayName;
          poll.votes = {};
          poll.optins = options;
          createPoll(poll);
          toast.success("Poll Generated Successfully!!");
          setTimeout(() => {
            props.history.push(`/${poll.id}`);
          }, 2000);
        }
      }
    }
  };

  return (
    <div className="mt-8 ">
      <ToastContainer newestOnTop autoClose={2000} />
      <div className="mx-2 px-2 md:px-8 md:mx-8 lg:px-16 lg:mx-28 text-left">
        <h1 className="text-purple-bright text-5xl my-4">Create Poll</h1>
        <h3 className="text-purple-moderate ">
          Fill out below fields to create a poll
        </h3>
        <form action="">
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
            value={title}
            onChange={handleTitle}
          />{" "}
          <br />
          <div
            className="flex flex-col justify-start items-start  
          md:flex-row md:justify-center md:items-center mt-4"
          >
            <div className="md:flex-1">
              <div
                id="add-trigger"
                className="inline-block"
                onClick={handleAdd}
              >
                <Button
                  placeholder="Add option"
                  icon={
                    <Fragment>
                      <i className="fas fa-plus-circle"></i>
                    </Fragment>
                  }
                />
              </div>
            </div>
            {/* <button className="form-input flex-1">Add another option</button> */}
            <div className=" md:ml-auto md:mr-4  md:flex">
              <p className="py-5 md:flex-1 md:px-6 text-purple-bright text-lg">
                Auto expire after a fixed time &nbsp;
                <ToggleSwitch
                  check={check}
                  setCheck={setCheck}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </p>
            </div>
          </div>
          {/* <label
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
          <br /> */}
          {!options.length
            ? null
            : options.map((option) => (
                <div key={option.index}>
                  <label
                    htmlFor={`option-${option.index}`}
                    className="text-purple-bright block text-lg pl-1 pb-2 pt-5"
                  >
                    Option {option.index}
                  </label>{" "}
                  <div className="flex justify-center items-center">
                    <input
                      type="text"
                      id={`option-${option.index}`}
                      className="placeholder-purple-moderate form-input w-full rounded-lg p-5 border border-gray-400 text-xl"
                      placeholder={`Option ${option.index}`}
                      value={option.title}
                      onChange={(value) => handleChange(option.index, value)}
                    />
                    <i
                      className="fas fa-trash-alt mx-7 text-purple-bright text-xl"
                      onClick={() => {
                        handleDelete(option.index);
                      }}
                    ></i>
                  </div>
                  <br />
                </div>
              ))}
          <div className="my-6 flex">
            <div className="flex-1">
              <div
                id="add-trigger"
                className="inline-block"
                onClick={handleSubmit}
              >
                <Button
                  placeholder="Generate Poll"
                  icon={
                    <Fragment>
                      <i className="fas fa-rocket"></i>
                    </Fragment>
                  }
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePoll;
