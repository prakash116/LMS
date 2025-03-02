import React from "react";
import { useState, useEffect } from "react";

function Weather() {
      const [time, setTime] = useState(new Date());
      useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);
        return () => clearInterval(interval); // Cleanup on unmount
      }, []);
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayName = days[time.getDay()];
      const month = time.getMonth() + 1;
      const date = time.getDate();
      const hours = String(time.getHours()).padStart(2, "0");
      const minutes = String(time.getMinutes()).padStart(2, "0");
      const seconds = String(time.getSeconds()).padStart(2, "0");

  return (
    <div className="p-2 mx-auto rounded-lg bg-gray-900 text-gray-100 mr-1">
      <div className="flex justify-between space-x-8">
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-24 h-24 p-2 dark:text-yellow-600 fill-current"
          >
            <path d="M256,104c-83.813,0-152,68.187-152,152s68.187,152,152,152,152-68.187,152-152S339.813,104,256,104Zm0,272A120,120,0,1,1,376,256,120.136,120.136,0,0,1,256,376Z"></path>
            <rect width="32" height="48" x="240" y="16"></rect>
            <rect width="32" height="48" x="240" y="448"></rect>
            <rect width="48" height="32" x="448" y="240"></rect>
            <rect width="48" height="32" x="16" y="240"></rect>
            <rect
              width="32"
              height="45.255"
              x="400"
              y="393.373"
              transform="rotate(-45 416 416)"
            ></rect>
            <rect
              width="32.001"
              height="45.255"
              x="80"
              y="73.373"
              transform="rotate(-45 96 96)"
            ></rect>
            <rect
              width="45.255"
              height="32"
              x="73.373"
              y="400"
              transform="rotate(-45.001 96.002 416.003)"
            ></rect>
            <rect
              width="45.255"
              height="32.001"
              x="393.373"
              y="80"
              transform="rotate(-45 416 96)"
            ></rect>
          </svg>
          <h1 className="text-xl font-semibold">Stockholm</h1>
        </div>
        <div className="flex flex-col items-center overflow-hidden">
            <h1 className="font-bold text-8xl">14°</h1>
            <h1>City</h1>
        </div>
      </div>
      <hr className="border-1" />
      <div className="flex p-2">
        <div className="font-bold w-1/2 text-2xl font-mono -mr-1 border-r-2">
            <h1>{hours}:{minutes}:{seconds}</h1>
            <h1 className="text-xl font-light">{dayName}</h1>
        </div>
        <div className="w-1/2 text-5xl font-semibold font-serif pl-4">
            <h1>{date}/{month}</h1>
        </div>
      </div>
    </div>
  );
}

export default Weather;
