import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import { UserSession } from "../firebase/UserProvider";
import { firestore } from "../firebase/config";
import Loader from "../img/Preloader.gif";
import "../styles.css";
import LiveOption from "./LiveOption";
import { updatePoll } from "../firebase/polls";

const Poll = (props) => {
  const id = props.match.params.id;
  const { user } = UserSession();
  const uid = user.id;
  const [expiry, setExpiry] = useState(false);
  const [poll, setPoll] = useState(null);
  const [index, setIndex] = useState(-1);
  const [modal, setModal] = useState(false);
  const [label, setLabel] = useState([]);
  const [pollData, setPollData] = useState([]);

  // const handleClick = (index) => {
  //   setIndex(index);
  //   // let x = poll;
  //   // if (!x.votes[uid]) {
  //   //   x.options.forEach((option) => {
  //   //     if (option.index == index) option.count++;
  //   //   });
  //   //   x.votes[uid] = index;
  //   // updatePoll(x);
  //   // } else {
  //   //   console.log("You have already voted");
  //   // }
  // };

  useEffect(() => {
    const docRef = firestore.doc(`/polls/${id}`);
    const unsubscribe = docRef.onSnapshot((document) => {
      if (document.exists) {
        setPoll(document.data());
        console.log(poll);
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
          console.log(document.data().votes);
          setIndex(document.data().votes[uid]);
        }
        setLabel(x);
        setPollData(y);
      } else {
        props.history.push("/not_found");
      }
    });
  }, []);

  if (!poll)
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "23444898429",
        }}
      >
        <img src={Loader} />
      </div>
    );
  return (
    <div className="lg:mx-20 flex flex-col min-h-screen">
      <Header />
      <div>
        <ToastContainer newestOnTop autoClose={2000} />
        <div className="flex-col lg:mx-48">
          <div className="my-7 text-4xl font-fred">
            <h1>{poll.title}</h1>
          </div>
          <div className="mt-5 mb-2 text-xl">
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
                        index={index}
                        setIndex={setIndex}
                        idx={option.index}
                        title={option.title}
                      />
                    );
                  else
                    return (
                      <LiveOption
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
                        index={index}
                        setIndex={setIndex}
                        idx={option.index}
                        title={option.title}
                      />
                    );
                  else
                    return (
                      <LiveOption
                        index={index}
                        setIndex={setIndex}
                        idx={option.index}
                        title={option.title}
                      />
                    );
                })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Poll;
