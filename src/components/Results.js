import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { UserSession } from "../firebase/UserProvider";
import { firestore } from "../firebase/config";
import "firebase/compat/auth";
import LivePoll from "./LivePoll";
import SocialBtn from "./SocialBtn";
import Modal from "./Modal";
import {
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";
import Loader from "../img/Preloader.gif";

const Results = (props) => {
  const id = props.match.params.id;

  const { user } = UserSession();
  const [expiry, setExpiry] = useState(false);
  const [poll, setPoll] = useState(null);
  const [label, setLabel] = useState([]);
  const uid = user.uid;
  const [modal, setModal] = useState(false);
  const [pollData, setPollData] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [currentVote, setCurrentVote] = useState("");

  const handleSubmit = () => {
    props.history.push(`/${id}`);
  };

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
          // const currLabel = label[document.data().votes[uid] - 1];
          setCurrentVote(x[document.data().votes[uid] - 1]);
          // console.log(currentVote);
        }
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
                      voters={option.voters}
                      creator={poll.creator}
                    />
                  ))
                ) : (
                  <p>Error</p>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full md:w-1/3 fixed bottom-0 left-0 md:static md:ml-16 rounded-md self-start mr-6 lg:w-3/12">
              {currentVote ? (
                <p className="bg-blue-200 text-blue-700 mt-5 md:mb-5 md:mt-0 text-sm lg:text-base text-center py-2 rounded hidden px-4 md:block">
                  {"You voted "}{" "}
                  <span className="font-semibold">{currentVote}</span>
                  {" on this poll"}
                </p>
              ) : (
                <button
                  className="focus:outline-none py-4 font-semibold focus:shadow text-xl w-full md:mb-4 md:w-auto bg-purple-bright text-white px-16 transition-all duration-300 shadow-lg hover:shadow-xl to-purple-600 rounded-lg hidden md:block "
                  onClick={handleSubmit}
                >
                  Submit vote
                </button>
              )}
              <div className="w-full bg-purple-light flex flex-col-reverse md:flex-col border-t border-gray-300 md:border-t-0 rounded-md self-start px-5 py-6 ">
                {currentVote ? (
                  <p className="bg-blue-200 text-blue-700 mt-5 md:mb-5 md:mt-0 text-sm lg:text-base text-center py-2 rounded md:hidden">
                    {"You voted "}{" "}
                    <span className="font-semibold">{currentVote}</span>
                    {" on this poll"}
                  </p>
                ) : (
                  <button
                    className="focus:outline-none py-4 font-semibold focus:shadow text-xl w-full mt-5 md:mb-0 md:w-auto bg-purple-bright text-white px-16 transition-all duration-300 shadow-lg hover:shadow-xl to-purple-600 rounded-lg md:hidden"
                    onClick={handleSubmit}
                  >
                    Submit vote
                  </button>
                )}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-bold text-gray-600 text-sm lg:text-base">{`Total Votes`}</p>
                    <h3 className="font-bold text-gray-900 text-4xl">
                      {totalVotes}
                    </h3>
                  </div>
                  <div className="flex md:hidden">
                    <div
                      className={`flex transition-all duration-150 mr-3 rounded-md px-2 text-white items-center -ml-2 w-full self-center py-1`}
                      style={{ backgroundColor: "#60a5fa" }}
                      onClick={() => setModal(true)}
                    >
                      <a href="#" className={`text-white`}>
                        <>
                          <i className="fas fa-qrcode"></i>
                        </>
                      </a>
                    </div>

                    <TwitterShareButton
                      url={`https://pollify.netlify.app/${poll.id}`}
                      title={`Vote to this poll titled "${poll.title}"  generated using Pollify\n`}
                      className="mx-3"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <WhatsappShareButton
                      url={`https://pollify.netlify.app/${poll.id}`}
                      title={`Vote to this poll titled "${poll.title}"  generated using Pollify`}
                      separator=":: "
                      className="mx-3"
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <FacebookShareButton
                      url={`https://pollify.netlify.app/${poll.id}`}
                      title={`Vote to this poll titled "${poll.title}"  generated using Pollify`}
                      className="mx-3"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                  </div>
                </div>
                <div className="mt-5 md:block hidden text-left">
                  <p className="font-semibold mb-2 text-gray-600 text-sm lg:text-base">
                    Share
                  </p>
                  <div className="py-3">
                    <div
                      className="inline-flex cursor-pointer items-center hover:bg-blue-500 transition-all duration-150 px-2 py-2 bg-blue-400 text-white rounded-md"
                      onClick={() => setModal(true)}
                    >
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
                        <TwitterShareButton
                          url={`https://pollify.netlify.app/${poll.id}`}
                          title={`Vote to this poll titled "${poll.title}"  generated using Pollify\n`}
                          className="mx-3 flex justify-center items-center"
                        >
                          <TwitterIcon size={22} round />
                          <span className="mx-2">Share on Twitter</span>
                        </TwitterShareButton>
                      </>
                    }
                    color="#55ACEE"
                    platform="twitter"
                  />
                  <SocialBtn
                    icon={
                      <>
                        <WhatsappShareButton
                          url={`https://pollify.netlify.app/${poll.id}`}
                          title={`Vote to this poll titled "${poll.title}"  generated using Pollify`}
                          separator=":: "
                          className="mx-3 flex justify-center items-center"
                        >
                          <WhatsappIcon size={22} round />
                          <span className="mx-2">Share on WhatsApp</span>
                        </WhatsappShareButton>
                      </>
                    }
                    color="#25D366"
                    platform="whatsapp"
                  />
                  <SocialBtn
                    icon={
                      <>
                        <FacebookShareButton
                          url={`https://pollify.netlify.app/${poll.id}`}
                          title={`Vote to this poll titled "${poll.title}"  generated using Pollify`}
                          className="mx-3 flex justify-center items-center"
                        >
                          <FacebookIcon size={22} round />
                          <span className="mx-2">Share on Facebook</span>
                        </FacebookShareButton>
                      </>
                    }
                    color="#4267B2"
                    platform="facebook"
                  />
                </div>
                {modal ? <Modal setModal={setModal} pollId={poll.id} /> : null}
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
