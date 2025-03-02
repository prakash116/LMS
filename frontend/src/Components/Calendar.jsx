import React, { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  // Generate an array for calendar days
  const daysArray = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Function to change the month
  const changeMonth = (offset) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className=" bg-white shadow-lg rounded-lg p-2 text-center">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => changeMonth(-1)} className="px-3 py-1 bg-gray-800 rounded">
            &lt;
          </button>
          <h2 className="text-xl text-indigo-900 font-bold">
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </h2>
          <button onClick={() => changeMonth(1)} className="px-3 py-1 bg-gray-800 rounded">
            &gt;
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-1 text-gray-800 font-semibold m-0">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mt-2">
          {daysArray.map((day, index) => (
            <div
              key={index}
              className={`p-2 rounded ${
                day === today.getDate() &&
                year === today.getFullYear() &&
                month === today.getMonth()
                  ? "bg-blue-500 text-white font-bold"
                  : "bg-gray-900"
              }`}
            >
              {day || ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
