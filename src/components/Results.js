import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { UserSession } from "../firebase/UserProvider";
import { firestore } from "../firebase/config";
import "firebase/compat/auth";
import LivePoll from "./LivePoll";

const Results = (props) => {
  const id = props.match.params.id;

  const { user } = UserSession();
  const [expiry, setExpiry] = useState(false);
  const [poll, setPoll] = useState(null);
  const [label, setLabel] = useState([]);
  const [pollData, setPollData] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  useEffect(() => {
    // console.log(props);
    const docRef = firestore.doc(`/polls/${id}`);
    const unsubscribe = docRef.onSnapshot((document) => {
      if (document.exists) {
        setPoll(document.data());
        // console.log(poll);
        let x = [],
          y = [],
          total = 0;
        if (document.data().expire) {
          if (new Date().getTime() / 1000 >= document.data().date.seconds)
            setExpiry(true);
        }
        document.data().options.forEach((option) => {
          total = total + option.count;
          x.push(option.title);
          y.push(option.count);
        });
        setTotalVotes(total);
        setLabel(x);
        setPollData(y);
      } else {
        props.history.push("/not_found");
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="lg:mx-20 flex flex-col min-h-screen">
      <Header />

      <div className="py-6">
        <div className="mb-40 md:mb-10 md:pb-0 my-10">
          <h2 className="mb-16 text-3xl">{poll && poll.title}</h2>
          <div className="flex flex-col md:flex-row">
            <div className="flex w-full md:w-2/3 flex-col">
              <div className="relative">
                {poll ? (
                  poll.options.map((option) => (
                    <LivePoll
                      key={option.index}
                      title={option.title}
                      count={option.count}
                      total={totalVotes}
                    />
                  ))
                ) : (
                  <p>Error</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Results;
