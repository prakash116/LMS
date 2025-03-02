import React from "react";
import { NavLink } from "react-router-dom";

function Register() {
  return (
    <>
      <div className="w-full h-[80vh] bg-indigo-950 flex justify-around items-center">
        <div>
          <div className="w-[25vw] h-90 bg-indigo-800 rounded-xl  flex flex-col items-center">
            <h1 className="font-bold text-xl px-6 py-2 bg-indigo-950 w-fit rounded-b-xl">
              Admin Register
            </h1>
            <img
              src="/Images/admin.jpeg"
              alt=""
              className="w-[11vw] m-2 rounded-lg"
            />
            <p className="p-4 text-center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore,
              exercitationem rerum illo odio
            </p>
            <NavLink to="/admin-register">
              <button className="bg-green-600 w-[20vw] p-2 rounded-lg btn text-lg">
                Register
              </button>
            </NavLink>
          </div>
        </div>
        <div>
          <div className="w-[25vw] h-90 bg-indigo-800 rounded-xl flex flex-col items-center">
            <h1 className="font-bold text-xl px-6 py-2 bg-indigo-950 w-fit rounded-b-xl">
              Teacher Register
            </h1>
            <img
              src="/Images/teacher.jpg"
              alt=""
              className="w-[11vw] m-2 rounded-lg"
            />
            <p className="p-4 text-center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore,
              exercitationem rerum illo odio
            </p>
            <NavLink to="/faculty-register">
              <button className="bg-green-600 w-[20vw] p-2 rounded-lg btn text-lg">
                Register
              </button>
            </NavLink>
          </div>
        </div>
        <div>
          <div className="w-[25vw] h-90 bg-indigo-800 rounded-xl flex flex-col items-center">
            <h1 className="font-bold text-xl px-6 py-2 bg-indigo-950 w-fit rounded-b-xl">
              Student Register
            </h1>
            <img
              src="/Images/student.jpg"
              alt=""
              className="w-[11vw] m-2 rounded-lg"
            />
            <p className="p-4 text-center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore,
              exercitationem rerum illo odio
            </p>
            <NavLink to="/StudentRegister">
              <button className="bg-green-600 w-[20vw] p-2 rounded-lg btn text-lg">
                Register
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 p-4 flex justify-center w-full">
        <h1>
          You already have an account?
          <NavLink to="/login" className="text-blue-500 font-semibold">
            {" "}
            Login
          </NavLink>
        </h1>
      </div>
    </>
  );
}

export default Register;
