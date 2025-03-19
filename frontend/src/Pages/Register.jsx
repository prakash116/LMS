import React from "react";
import { NavLink } from "react-router-dom";

function Register() {
  return (
    <>
      <div className="w-full h-auto sm:h-[85vh] bg-indigo-950 flex flex-col sm:flex-row justify-around items-center py-8 sm:py-0">
        {/* Admin Register Card */}
        <div className="w-full sm:w-[25vw] h-auto sm:h-90 bg-indigo-800 hover:border-l-2 hover:border-r-2 rounded-xl flex flex-col items-center mb-8 sm:mb-0">
          <h1 className="font-bold text-lg sm:text-xl px-6 py-2 bg-indigo-950 w-fit rounded-b-xl">
            Admin Register
          </h1>
          <img
            src="/Images/admin.jpeg"
            alt="Admin"
            className="w-[40vw] sm:w-[11vw] m-2 rounded-lg"
          />
          <p className="p-4 text-center text-sm sm:text-base">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore,
            exercitationem rerum illo odio
          </p>
          <NavLink to="/admin-register">
            <button className="bg-green-600 w-[80vw] sm:w-[20vw] p-2 rounded-lg btn text-sm sm:text-lg">
              Register
            </button>
          </NavLink>
        </div>

        {/* Teacher Register Card */}
        <div className="w-full sm:w-[25vw] h-auto sm:h-90 bg-indigo-800 hover:border-l-2 hover:border-r-2 rounded-xl flex flex-col items-center mb-8 sm:mb-0">
          <h1 className="font-bold text-lg sm:text-xl px-6 py-2 bg-indigo-950 w-fit rounded-b-xl">
            Teacher Register
          </h1>
          <img
            src="/Images/teacher.jpg"
            alt="Teacher"
            className="w-[40vw] sm:w-[11vw] m-2 rounded-lg"
          />
          <p className="p-4 text-center text-sm sm:text-base">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore,
            exercitationem rerum illo odio
          </p>
          <NavLink to="/faculty-register">
            <button className="bg-green-600 w-[80vw] sm:w-[20vw] p-2 rounded-lg btn text-sm sm:text-lg">
              Register
            </button>
          </NavLink>
        </div>

        {/* Student Register Card */}
        <div className="w-full sm:w-[25vw] h-auto sm:h-90 bg-indigo-800 hover:border-l-2 hover:border-r-2 rounded-xl flex flex-col items-center">
          <h1 className="font-bold text-lg sm:text-xl px-6 py-2 bg-indigo-950 w-fit rounded-b-xl">
            Student Register
          </h1>
          <img
            src="/Images/student.jpg"
            alt="Student"
            className="w-[40vw] sm:w-[11vw] m-2 rounded-lg"
          />
          <p className="p-4 text-center text-sm sm:text-base">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore,
            exercitationem rerum illo odio
          </p>
          <NavLink to="/StudentRegister">
            <button className="bg-green-600 w-[80vw] sm:w-[20vw] p-2 rounded-lg btn text-sm sm:text-lg">
              Register
            </button>
          </NavLink>
        </div>
      </div>

      {/* Login Link */}
      <div className="absolute bottom-0 p-4 flex justify-center w-full">
        <h1 className="text-sm sm:text-base">
          You already have an account?
          <NavLink
            to="/login"
            className="text-blue-500 hover:text-blue-400 font-semibold"
          >
            {" "}
            Login
          </NavLink>
        </h1>
      </div>
    </>
  );
}

export default Register;