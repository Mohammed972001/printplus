import React from "react";

const ErrorSection = () => {
  return (
    <div
      dir="ltr"
      className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16"
    >
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute h-full">
            <div className="flex flex-col gap-4 justify-center items-center h-full">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                Error 404 It looks like something went wrong.
              </h1>
              <p className="text-opacity-25">Don't worry, our team is already on it.</p>
              <p className="text-opacity-25">Please try refreshing the page or come back later.</p>
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
};

export default ErrorSection;
