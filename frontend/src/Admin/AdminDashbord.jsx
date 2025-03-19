import React from "react";
import AdminHeader from "./AdminHeader";
import { NavLink } from "react-router-dom";

function AdminDashbord() {
  return (
    <>
      <div className="w-full h-full bg-indigo-950">
        <AdminHeader />
        <div className="flex h-full justify-around items-center">
          <div className="w-full h-auto sm:h-[80vh] bg-indigo-950 flex flex-col sm:flex-row justify-around items-center p-4 sm:p-0">
            {/* All Courses Card */}
            <div className="w-full sm:w-[25vw] h-auto sm:h-90 bg-indigo-800 rounded-xl flex flex-col items-center mb-4 sm:mb-0">
              <h1 className="font-bold text-lg sm:text-xl px-6 py-2 border-b-1 bg-indigo-950 w-fit rounded-b-xl">
                All Courses
              </h1>
              <img
                src="/Images/Courses.png"
                alt="Courses"
                className="size-[40vw] sm:size-[11vw] m-2 rounded-lg"
              />
              <p className="p-4 text-center text-sm sm:text-base">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tempore, exercitationem rerum illo odio
              </p>
              <NavLink to="/all-courses">
                <button className="bg-green-600 w-[80vw] sm:w-[20vw] p-2 rounded-lg btn text-sm sm:text-lg">
                  View More
                </button>
              </NavLink>
            </div>

            {/* All Teachers Card */}
            <div className="w-full sm:w-[25vw] h-auto sm:h-90 bg-indigo-800 rounded-xl flex flex-col items-center mb-4 sm:mb-0">
              <h1 className="font-bold text-lg sm:text-xl px-6 py-2 border-b-1 bg-indigo-950 w-fit rounded-b-xl">
                All Teachers
              </h1>
              <img
                src="/Images/teacher.jpg"
                alt="Teachers"
                className="size-[40vw] sm:size-[11vw] m-2 rounded-lg"
              />
              <p className="p-4 text-center text-sm sm:text-base">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tempore, exercitationem rerum illo odio
              </p>
              <NavLink to="/all-faculty">
                <button className="bg-green-600 w-[80vw] sm:w-[20vw] p-2 rounded-lg btn text-sm sm:text-lg">
                  View More
                </button>
              </NavLink>
            </div>

            {/* All Students Card */}
            <div className="w-full sm:w-[25vw] h-auto sm:h-90 bg-indigo-800 rounded-xl flex flex-col items-center">
              <h1 className="font-bold text-lg sm:text-xl px-6 py-2 border-b-1 bg-indigo-950 w-fit rounded-b-xl">
                All Students
              </h1>
              <img
                src="/Images/student.jpg"
                alt="Students"
                className="size-[40vw] sm:size-[11vw] m-2 rounded-lg"
              />
              <p className="p-4 text-center text-sm sm:text-base">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tempore, exercitationem rerum illo odio
              </p>
              <NavLink to="/all-students">
                <button className="bg-green-600 w-[80vw] sm:w-[20vw] p-2 rounded-lg btn text-sm sm:text-lg">
                  View More
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashbord;
