import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { UserSession } from "../firebase/UserProvider";
import { firestore } from "../firebase/config";
import "firebase/compat/auth";
import LivePoll from "./LivePoll";
import SocialIcon from "./SocialIcon";
import SocialBtn from "./SocialBtn";

const Results = (props) => {
  const id = props.match.params.id;

  const { user } = UserSession();
  const [expiry, setExpiry] = useState(false);
  const [poll, setPoll] = useState(null);
  const [label, setLabel] = useState([]);
  const uid = user.uid;
  const [pollData, setPollData] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [currentVote, setCurrentVote] = useState("");
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
        if (document.data().votes && document.data().votes[uid]) {
          const currLabel = label[document.data().votes[uid] - 1];
          setCurrentVote(currLabel);
          // console.log(currentVote);
        }
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
          <h2 className="mb-12 ml-4 text-3xl font-fred text-left">
            {poll && poll.title}
          </h2>
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

            <div className="flex flex-col w-full md:w-1/3 fixed bottom-0 left-0 md:static md:ml-16 rounded-md self-start mr-6">
              {currentVote ? (
                <p className="bg-blue-200 text-blue-700 mt-5 md:mb-5 md:mt-0 text-sm lg:text-base text-center py-2 rounded hidden px-4 md:block">
                  {"You voted "}{" "}
                  <span className="font-semibold">{currentVote}</span>
                  {" on this poll"}
                </p>
              ) : (
                ``
              )}
              <div className="w-full bg-purple-light flex flex-col-reverse md:flex-col border-t border-gray-300 md:border-t-0 rounded-md self-start px-5 py-6">
                {currentVote ? (
                  <p className="bg-blue-200 text-blue-700 mt-5 md:mb-5 md:mt-0 text-sm lg:text-base text-center py-2 rounded md:hidden">
                    {"You voted "}{" "}
                    <span className="font-semibold">{currentVote}</span>
                    {" on this poll"}
                  </p>
                ) : (
                  ``
                )}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-semibold text-gray-600 text-sm lg:text-base">{`Total Votes`}</p>
                    <h3 className="font-bold text-gray-900 text-4xl">
                      {totalVotes}
                    </h3>
                  </div>
                  <div className="flex md:hidden">
                    <SocialIcon
                      icon={
                        <>
                          <i className="fas fa-qrcode"></i>
                        </>
                      }
                      color="#60a5fa"
                    />

                    <SocialIcon
                      icon={
                        <>
                          <i className="fab fa-twitter"></i>
                        </>
                      }
                      color="#55ACEE"
                    />
                    <SocialIcon
                      icon={
                        <>
                          <i className="fab fa-whatsapp"></i>
                        </>
                      }
                      color="#25D366"
                    />
                    <SocialIcon
                      icon={
                        <>
                          <i className="fab fa-facebook"></i>
                        </>
                      }
                      color="#4267B2"
                    />
                  </div>
                </div>
                <div className="mt-5 md:block hidden text-left">
                  <p className="font-semibold mb-2 text-gray-600 text-sm lg:text-base">
                    Share
                  </p>
                  <div className="py-3">
                    <div className="inline-flex cursor-pointer items-center hover:bg-blue-500 transition-all duration-150 px-2 py-2 bg-blue-400 text-white rounded-md">
                      <div className="mr-2">
                        <i class="fas fa-qrcode"></i>
                      </div>
                      <button className="focus:outline-none pr-3">
                        Share QR Code
                      </button>
                    </div>
                  </div>
                  <SocialBtn
                    icon={
                      <>
                        <i className="fab fa-twitter"></i>
                      </>
                    }
                    color="#55ACEE"
                    platform="twitter"
                  />
                  <SocialBtn
                    icon={
                      <>
                        <i className="fab fa-whatsapp"></i>
                      </>
                    }
                    color="#25D366"
                    platform="whatsapp"
                  />
                  <SocialBtn
                    icon={
                      <>
                        <i className="fab fa-facebook"></i>
                      </>
                    }
                    color="#4267B2"
                    platform="facebook"
                  />
                </div>
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
