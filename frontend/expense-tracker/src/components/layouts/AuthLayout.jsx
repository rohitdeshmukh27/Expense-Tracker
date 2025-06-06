import React from "react";
import CARD_2 from "../../assets/images/card2.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-[#f8f5ff] select-none">
      {/* Left Side - Auth Form */}
      <div className="w-full lg:w-1/3 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Expense Tracker
          </h1>
          <p className="text-gray-600 text-sm mb-8">
            Please enter your details to log in
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-8">{children}</div>
        </div>
      </div>

      {/* Right Side - Dashboard Preview */}
      <div className="hidden lg:flex w-2/3 bg-gradient-to-br from-purple-600 to-purple-500 rounded-l-[3rem] p-12 relative overflow-hidden ">
        <div className="absolute top-0 right-0 w-full h-full">
          {/* Decorative Elements */}
          <div className="absolute top-5 right-12 bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white/60 text-sm select-none">
                  Track Your Income & Expenses
                </p>
                <p className="text-white text-2xl font-bold">$430,000</p>
              </div>
            </div>
          </div>

          {/* Graph Area */}
          <div className="absolute bottom-5 right-12 bg-white/10 rounded-2xl p-6 backdrop-blur-sm w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">
                All Details at one Place
              </h3>
              <button className="text-purple-200 text-sm bg-white/20 px-4 py-1 rounded-lg">
                View More
              </button>
            </div>
            <img
              src={CARD_2}
              alt="Expense tracker illustration"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
