import React, { useEffect, useState } from "react";
import { UserSession } from "../firebase/UserProvider";

const LivePoll = (props) => {
  const { user } = UserSession();
  const [percentage, setPercentage] = useState(0);
  const [hide, setHide] = useState(true);
  useEffect(() => {
    let per = (props.count / props.total) * 100;
    if (!per) {
      per = 0;
    }
    setPercentage(Math.round(per));
  }, [percentage]);
  return (
    <div>
      <div className="py-6 bg-white px-6 mb-5 rounded-md shadow-xl relative">
        <div className="font-semibold">
          <div className="bg-white lg:hidden shadow-2xl border border-gray-300 sm:text-sm font-bold px-4 py-1 rounded-lg absolute right-0 top-0 -mr-2 -mt-3 sm:mr-5 text-xs md:text-base">{`${percentage} %`}</div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary-dark">
                {props.title}
              </h2>
            </div>
            <div className="hidden lg:block">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary-dark">{`${percentage} %`}</h2>
            </div>
          </div>
          <div className="h-2 w-full bg-gray-300 rounded-full">
            <div
              className={`h-2 rounded-full mt-3 bg-purple-bright `}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="mt-3 text-purple-bright text-xs lg:text-base text-left">
            {"Votes: " + props.count}
            {user.uid === props.creator.uid ? (
              <>
                <span
                  className="text-purple-bright mx-3"
                  onClick={() => setHide(!hide)}
                >
                  <i className="fas fa-chevron-circle-down "></i>
                </span>
                <div className={`${hide ? "hidden" : "block"} `}>
                  Voters :{" "}
                  <span className="text-gray-500">
                    {props.voters?.join(", ")}
                  </span>
                </div>
              </>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LivePoll;
