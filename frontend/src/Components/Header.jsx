import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Auth/LoginSlice";
import { ImCross } from "react-icons/im";
import { getAdminThunk } from "../Redux/Admin/AdminSlice";
import { getFacultyThunk } from "../Redux/Faculty/FacultySlice";
import { getStudentThunk } from "../Redux/Student/StudentSlice";
import { MdDashboard } from "react-icons/md";
import { GiBookAura } from "react-icons/gi";
import { MdPermContactCalendar } from "react-icons/md";
import { AiFillInfoCircle } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";

function Header() {
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.loginSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user.role === "admin" && user.id) {
      dispatch(getAdminThunk(user.id));
      setRole(user.role);
      return;
    }
    if (user && user.role === "faculty" && user.id) {
      dispatch(getFacultyThunk(user.id));
      setRole(user.role);
      return;
    }
    if (user && user.role === "student" && user.id) {
      dispatch(getStudentThunk(user.id));
      setRole(user.role);
      return;
    }
  }, [user]);

  const { adminData } = useSelector((state) => state.adminSlice);
  const { facultyData } = useSelector((state) => state.facultySlice);
  const { studentData } = useSelector((state) => state.studentSlice);
  const [name, setName] = useState("");
  

  useEffect(() => {
    if (
      adminData &&
      adminData.data &&
      adminData.data.data &&
      adminData.data.data.adminName
    ) {
      setName(adminData.data.data.adminName);
      setProfile(adminData.data.data.adminProfile);
    }

    if (facultyData && facultyData.data && facultyData.data.facultyName) {
      setName(facultyData.data.facultyName);
      setProfile(facultyData.data.facultyProfile);
    }

    if (studentData && studentData.data && studentData.data.studentName) {
      setName(studentData.data.studentName);
      setProfile(studentData.data.studentProfile);
    }
  }, [adminData, facultyData, studentData]);

  const [sidebar, setSidebar] = useState({ visibility: "hidden" });

  function handleSidbar() {
    setSidebar({ visibility: "visible" });
  }

  function handleLogout() {
    dispatch(logout());
    setSidebar({ visibility: "hidden" });
    navigate("/");
  }
  return (
    <div>
      <header className="p-2 bg-indigo-900/95 border-b-1">
        <div className="flex justify-between h-16">
          <div className="flex">
            <NavLink to="/" className="flex items-center p-2">
              <img src="/Images/icon.png" alt="" className="h-18" />
            </NavLink>
            <ul className="flex gap-2">
              {user ? (
                <>
                  <li className="flex">
                    <NavLink
                      to="/dashbord"
                      className="flex items-center px-4 -mb-1 hover:font-semibold hover:text-amber-300"
                    >
                      Dasboard
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
              {user?.role !== 'admin' && user?.role !== 'faculty' ? (
                  <li className="flex">
                  <NavLink to="/course" className="flex items-center px-4 -mb-1 hover:font-semibold hover:text-amber-300">
                    Course
                  </NavLink>
                </li>
              ):
              <></>
              }
             
              {user?.role !== "admin" ? 
              <>
              <li className="flex">
                <NavLink
                  to="/contact"
                  className="flex items-center px-4 -mb-1 hover:font-semibold hover:text-amber-300"
                >
                  Contact Us
                </NavLink>
              </li>
              <li className="flex">
                <NavLink to="/about" className="flex items-center px-4 -mb-1 hover:font-semibold hover:text-amber-300">
                  About Us
                </NavLink>
              </li>
              </> : <></>}
              
            </ul>
          </div>
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <NavLink to="/register">
                  <button className="px-8 py-2.5 font-semibold rounded dark:bg-violet-800 border-r-2 border-l-2 hover:border-amber-300 dark:text-gray-50">
                    Sign Up
                  </button>
                </NavLink>
                <NavLink to="/login">
                  <button className="px-8 py-2.5 font-semibold rounded dark:bg-violet-800 border-r-2 border-l-2 hover:border-amber-300 dark:text-gray-50">
                    Log in
                  </button>
                </NavLink>
              </>
            ) : (
              <>
                <button className="flex gap-3 justify-center items-center">
                  <h1 className="font-semibold text-l">
                    Welcome, {name ? name : "Sir/Ma'am"}
                  </h1>

                  <img
                    onClick={handleSidbar}
                    src={
                      profile
                        ? `http://localhost:8585/${role}/${profile}`
                        : null
                    }
                    alt="Imge"
                    className="w-10 h-10 bg-amber-200 rounded-full"
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      <div className="flex absolute w-full h-[100vh] top-0" style={sidebar}>
        <div
          onClick={() => setSidebar({ visibility: "hidden" })}
          className="w-full bg-black/70"
        ></div>
        <div className="w-1/3 bg-indigo-950/90">
          <div className="ml-4 mt-4 p-2 hover:bg-red-500 w-fit rounded-full">
            <ImCross onClick={() => setSidebar({ visibility: "hidden" })} />
          </div>
          <div className="flex justify-center flex-col -mt-5 items-center">
            <img
              onClick={handleSidbar}
              src={
                profile
                  ? `http://localhost:8585/${role}/${profile}`
                  : null
              }
              alt="Imge"
              className="w-25 h-25 bg-amber-200 rounded-full"
            />
            <h1 className="font-semibold text-l">
              {name ? name : "Sir/Ma'am"}
            </h1>
          </div>
          <hr className="mt-2" />
          <div className="font-semibold text-lg flex gap-0 flex-col space-y-1 text-white">
            <ul className="space-y-2 list-none">
              <NavLink
                to="/dashbord"
                onClick={() => setSidebar({ visibility: "hidden" })}
              >
                <li className="flex items-center gap-2 p-2 hover:border-b-2 pl-6 border-transparent hover:border-white hover:bg-black cursor-pointer">
                  <MdDashboard />
                  Dashboard
                </li>
              </NavLink>
              {user?.role !== 'admin' && user?.role !== 'faculty' ? (
              <NavLink
                to="/course"
                onClick={() => setSidebar({ visibility: "hidden" })}
              >
                <li className="flex items-center gap-2 p-2 hover:border-b-2 pl-6 border-transparent hover:border-white hover:bg-black cursor-pointer">
                  <GiBookAura />
                  Course
                </li>
              </NavLink>
            ):
            <></>
            }
            {user?.role !== "admin" ? 
            <>
              <NavLink
                to="/contact"
                onClick={() => setSidebar({ visibility: "hidden" })}
              >
                <li className="flex items-center gap-2 p-2 hover:border-b-2 pl-6 border-transparent hover:border-white hover:bg-black cursor-pointer">
                  <MdPermContactCalendar /> Contact
                </li>
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setSidebar({ visibility: "hidden" })}
              >
                <li className="flex items-center gap-2 p-2 hover:border-b-2 pl-6 border-transparent hover:border-white hover:bg-black cursor-pointer">
                  <AiFillInfoCircle /> About us
                </li>
              </NavLink>
              </> : <></>}
              <NavLink onClick={() => setSidebar({ visibility: "hidden" })}>
                <li className="flex items-center gap-2 p-2 hover:border-b-2 pl-6  border-transparent hover:border-white hover:bg-black cursor-pointer">
                  <IoSettings /> Setting
                </li>
              </NavLink>
              <NavLink onClick={() => setSidebar({ visibility: "hidden" })}>
                <li className="flex items-center gap-2 p-2 hover:border-b-2 pl-6 border-transparent hover:border-white hover:bg-black cursor-pointer">
                  <RiAccountCircleFill />
                  Personal Information
                </li>
              </NavLink>
            </ul>
            <button
              onClick={handleLogout}
              className="w-[280px] px-4 py-2 mr-5 ml-5 bg-red-400 hover:bg-red-700 absolute bottom-6 text-white rounded-md"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
