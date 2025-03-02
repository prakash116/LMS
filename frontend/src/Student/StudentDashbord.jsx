import React from "react";
import Calendar from "../Components/Calendar";
import DigitalWatch from "../Components/Time";
import Main from "./Main";

function StudentDashbord() {
  return (
    <>
      <div className="flex">
        <div className="w-1/2">
          <Main />
        </div>
        <div className="w-[1px] h-screen bg-amber-200"></div>
        <div className="w-1/2 p-2">
          <DigitalWatch />
          <Calendar />
        </div>
      </div>
    </>
  );
}

export default StudentDashbord;
