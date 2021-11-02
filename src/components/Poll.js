import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "firebase/compat/auth";
import { UserSession } from "../firebase/UserProvider";
import { firestore } from "../firebase/config";
import Loader from "../img/Preloader.gif";
import "../styles.css";
import LiveOption from "./LiveOption";
import { updatePoll } from "../firebase/polls";

const Poll = (props) => {
  const id = props.match.params.id;
  const { user } = UserSession();
  const uid = user.uid;
  const [expiry, setExpiry] = useState(false);
  const [poll, setPoll] = useState(null);
  const [index, setIndex] = useState(-1);
  const [modal, setModal] = useState(false);
  const [label, setLabel] = useState([]);
  const [pollData, setPollData] = useState([]);

  const handleSubmit = () => {
    let x = poll;
    // console.log(user);
    if (expiry) {
      toast.error("This Poll has expired!!");
      return;
    }
    if (!x.votes[uid]) {
      x.options.forEach((option) => {
        if (option.index === index) option.count++;
      });
      x.votes[uid] = index;
      updatePoll(x);
      toast.success("Vote submitted!!");
      setTimeout(() => {
        props.history.push(`/results/${poll.id}`);
      }, 2000);
    } else {
      toast.error("You have already voted!!");
    }
  };

  useEffect(() => {
    const docRef = firestore.doc(`/polls/${id}`);
    const unsubscribe = docRef.onSnapshot((document) => {
      if (document.exists) {
        setPoll(document.data());
        // console.log(poll);
        let x = [],
          y = [];
        if (document.data().expire) {
          if (new Date().getTime() / 1000 >= document.data().date.seconds)
            setExpiry(true);
        }
        document.data().options.forEach((option) => {
          x.push(option.title);
          y.push(option.count);
        });
        if (document.data().votes && document.data().votes[uid]) {
          // console.log(document.data().votes);
          setIndex(document.data().votes[uid]);
        }
        setLabel(x);
        setPollData(y);
      } else {
        props.history.push("/not_found");
      }
    });
    return () => unsubscribe();
  }, []);

  if (!poll)
    return (
      <div className="w-full flex h-screen items-center justify-center z-50">
        <img src={Loader} />
      </div>
    );
  return (
    <div className="lg:mx-20 flex flex-col min-h-screen">
      <Header />
      <div>
        <ToastContainer newestOnTop autoClose={2000} />
        <div className="flex-col mx-6 md:mx-24  lg:mx-48">
          <div className="my-7 text-4xl font-fred">
            <h1>{poll.title}</h1>
          </div>
          <div className="mt-5 mb-6 text-xl">
            {expiry ? (
              <h2>This poll is no longer accepting responses ❌</h2>
            ) : (
              <h2 className="font-fred">Select an Option 👇</h2>
            )}
          </div>
          <div className="flex flex-col items-center justify-center flex-wrap">
            {expiry
              ? poll.options.map((option) => {
                  if (option.index != index)
                    return (
                      <LiveOption
                        key={option.index}
                        index={index}
                        setIndex={setIndex}
                        idx={option.index}
                        title={option.title}
                      />
                    );
                  else
                    return (
                      <LiveOption
                        key={option.index}
                        index={index}
                        setIndex={setIndex}
                        idx={option.index}
                        title={option.title}
                      />
                    );
                })
              : poll.options.map((option) => {
                  if (option.index != index)
                    return (
                      <LiveOption
                        key={option.index}
                        index={index}
                        setIndex={setIndex}
                        idx={option.index}
                        title={option.title}
                      />
                    );
                  else
                    return (
                      <LiveOption
                        key={option.index}
                        index={index}
                        setIndex={setIndex}
                        idx={option.index}
                        title={option.title}
                      />
                    );
                })}
          </div>
          <div className="flex items-center justify-between my-4 flex-col  md:flex-row">
            <button
              className="focus:outline-none py-4 font-semibold focus:shadow text-xl w-full mb-8 md:mb-0 md:w-auto bg-purple-bright text-white px-16 transition-all duration-300 shadow-lg hover:shadow-xl to-purple-600 rounded-lg"
              onClick={handleSubmit}
            >
              Submit vote
            </button>
            <Link
              to={`/results/${id}`}
              className="flex items-center text-gray-500 mr-2"
            >
              <p className="text-lg mr-2  font-medium tracking-wide">
                View Results
              </p>
              <i className="fas fa-angle-right"></i>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Poll;
