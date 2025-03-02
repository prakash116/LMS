import React from "react";
import AdminHeader from "./AdminHeader";
import { NavLink } from "react-router-dom";

function AdminDashbord() {
  return (
    <>
      <div className="w-full h-full bg-indigo-950">
        <AdminHeader />
        <div className="flex h-full justify-around items-center">
          <div className="w-full h-[80vh] bg-indigo-950 flex justify-around items-center">
              <div className="w-[25vw] h-90 bg-indigo-800 rounded-xl  flex flex-col items-center">
                <h1 className="font-bold text-xl px-6 py-2 border-b-1 bg-indigo-950 w-fit rounded-b-xl">
                  All Courses
                </h1>
                <img
                  src="/Images/Courses.png"
                  alt=""
                  className="size-[11vw] m-2 rounded-lg"
                />
                <p className="p-4 text-center">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Tempore, exercitationem rerum illo odio
                </p>
                <NavLink to="/all-courses">
                  <button className="bg-green-600 w-[20vw] p-2 rounded-lg btn text-lg">
                    View More
                  </button>
                </NavLink>
              </div>
              <div className="w-[25vw] h-90 bg-indigo-800 rounded-xl flex flex-col items-center">
                <h1 className="font-bold text-xl px-6 py-2 border-b-1 bg-indigo-950 w-fit rounded-b-xl">
                 All Teachers
                </h1>
                <img
                  src="/Images/teacher.jpg"
                  alt=""
                  className="size-[11vw] m-2 rounded-lg"
                />
                <p className="p-4 text-center">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Tempore, exercitationem rerum illo odio
                </p>
                <NavLink to="/all-faculty">
                  <button className="bg-green-600 w-[20vw]  p-2 rounded-lg btn text-lg">
                    View More
                  </button>
                </NavLink>
              </div>
              <div className="w-[25vw] h-90 bg-indigo-800 rounded-xl flex flex-col items-center">
                <h1 className="font-bold text-xl px-6 py-2 border-b-1 bg-indigo-950 w-fit rounded-b-xl">
                  All Student
                </h1>
                <img
                  src="/Images/student.jpg"
                  alt=""
                  className="size-[11vw] m-2 rounded-lg"
                />
                <p className="p-4 text-center">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Tempore, exercitationem rerum illo odio
                </p>
                <NavLink to="/all-students">
                  <button className="bg-green-600 w-[20vw] p-2 rounded-lg btn text-lg">
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
