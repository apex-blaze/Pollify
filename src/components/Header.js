import React from "react";
import Logo from "./Logo";
const Header = () => {
  return (
    <>
      <div class="px-4">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <a href="#" className="flex items-center my-4 px-2">
                  <Logo />
                </a>
              </div>

              <div class="flex items-center space-x-3 ">
                <a
                  href="#"
                  class="py-2 px-2 md:px-5 md:py-3 font-medium text-white bg-purple-bright rounded hover:bg-purple-moderate transition duration-300"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
