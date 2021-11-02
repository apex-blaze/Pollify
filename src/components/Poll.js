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
import QRCode from "qrcode.react";
import {
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";

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

          <div className="">
            <h3 className="font-fred text-lg">
              Share this Poll
              <span className="px-2 text-lg">
                <i className="far fa-share-square"></i>
              </span>
            </h3>
            <div className="flex justify-center items-center my-4">
              <TwitterShareButton
                url={`https://pollify.netlify.app/${poll.id}`}
                title={`Vote to this poll titled "${poll.title}"  generated using Insta Poll\n`}
                className="mx-3"
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={`https://pollify.netlify.app/${poll.id}`}
                title={`Vote to this poll titled "${poll.title}"  generated using Insta Poll`}
                separator=":: "
                className="mx-3"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <FacebookShareButton
                url={`https://pollify.netlify.app/${poll.id}`}
                title={`Vote to this poll titled "${poll.title}"  generated using Insta Poll`}
                className="mx-3"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>
            <div className="my-5">
              <input
                className="w-60 border-2 border-gray-400 rounded-sm text-lg text-gray-400 px-3"
                type="text"
                value={`https://pollify.netlify.app/${poll.id}`}
                disabled
              />
              <button className="bg-transparent bg-purple-bright  font-semibold text-white py-1 px-3 border-2 border-purple-bright hover:border-transparent rounded-md">
                Copy URL{" "}
                <span className="mx-1">
                  <i className="far fa-copy"></i>
                </span>
              </button>
              <div className="inline-block my-3 md:my-auto mx-5">
                <button className="bg-transparent bg-purple-bright  font-semibold text-white py-1 px-3 border-2 border-purple-bright hover:border-transparent rounded-md">
                  QR Code
                  <span className="mx-1">
                    <i className="fas fa-qrcode"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Poll;
