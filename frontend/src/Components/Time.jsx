import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa"; // Importing FontAwesome Clock Icon

const DigitalWatch = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Format time to HH:MM:SS AM/PM
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg shadow-lg">
        <FaClock className="text-5xl text-yellow-400" />
        <span className="text-4xl font-bold">{formattedTime}</span>
      </div>
    </div>
  );
};

export default DigitalWatch;
