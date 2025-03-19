import React from "react";
import Calendar from "../Components/Calendar";
import DigitalWatch from "../Components/Time";
import Main from "./Main";

function StudentDashbord() {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-1/2">
          <Main />
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] md:w-[1px] md:h-screen bg-amber-200"></div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-2">
          <DigitalWatch />
          <Calendar />
        </div>
      </div>
    </>
  );
}

export default StudentDashbord;