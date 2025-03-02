import React from "react";

function Main() {
  const time = new Date();
  const hours = String(time.getHours()).padStart(2, "0");

  let wish;
  
  switch (true) {
    case hours >= 4 && hours < 12:
      wish = "Good Morning";
      break;
    case hours >= 12 && hours < 18:
      wish = "Good Afternoon";
      break;
    default:
      wish = "Good Evening";
      break;
  }

  return(
    <>
      <div className="w-full font-serif">
        <div className="w-full flex flex-col items-center justify-center p-5">
          <h1 className="text-2xl font-bold">
            Stay Focused<span className="text-sky-800">,</span>
            <span className="text-pink-800"> Keep Learning,</span>
            <span className="text-sky-800"> & </span>Never Give Up
          </h1>
          <h1 className="flex gap-20 p-3 text-lg font-bold">
            {wish} <span>Prakash Mani</span>
          </h1>
        </div>
        <div className="w-full px-4 flex mb-8">
          <div className="w-1/3 h-30 border-r-2 p-1">
            <img src="" alt="" className="h-full w-full" />
          </div>
          <div className="pl-4 flex flex-col justify-center">
            <h1 className="font-bold text-lg">Course Title</h1>
            <h1 className="">Teacher: Teacher Name</h1>
            <h1 className="">Time: 01:00 PM - 03:00 PM</h1>
            <h1 className="">Valid Date : 30/Dec/2025</h1>
          </div>
          <div className=" flex flex-col justify-around items-end gap-1 w-43">
            <button className="btn rounded-md bg-sky-800 px-[20px]">
              Assinment
            </button>
            <button className="btn rounded-md bg-sky-800 px-[22px]">
              Recording
            </button>
            <button className="btn rounded-md bg-green-600 px-[23px]">
              Live Class
            </button>
          </div>
        </div>
        <div className="w-full px-4 flex">
          <div className="w-1/3 h-30 border-r-2 p-1">
            <img src="" alt="" className="h-full w-full" />
          </div>
          <div className="pl-4 flex flex-col justify-center">
            <h1 className="font-bold text-lg">Course Title</h1>
            <h1 className="">Teacher: Teacher Name</h1>
            <h1 className="">Time: 01:00 PM - 03:00 PM</h1>
            <h1 className="">Valid Date : 30/Dec/2025</h1>
          </div>
          <div className=" flex flex-col justify-around gap-1 items-end w-43">
            <button className="btn rounded-md bg-sky-800 px-[20px]">
              Assinment
            </button>
            <button className="btn rounded-md bg-sky-800 px-[22px]">
              Recording
            </button>
            <button className="btn rounded-md bg-green-600 px-[23px]">
              Live Class
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
