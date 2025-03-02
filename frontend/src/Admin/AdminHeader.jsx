import React, { useEffect, useState } from "react";

function AdminHeader() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[time.getDay()];
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const year = time.getFullYear();
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");

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
  return (
    <>
      <div className="bg-sky-900/90 border-b-1 w-full font-bold flex justify-between p-3 h-fit">
        <div>Weather</div>{" "}
        <div>
          Time{" "}
          <span className="text-violet-600">
            {hours}:{minutes}:{seconds}
          </span>
        </div>
        <div>
          <span className="text-pink-900">{dayName} </span>
          {date}/{month}/{year}
        </div>
        <div>{wish}</div>
      </div>
    </>
  );
}

export default AdminHeader;
