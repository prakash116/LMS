import React, { useState } from "react";
import AuthImagePattern from "./AuthImagePattren";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  resetUserThunk,
  sendOtpThunk,
  verifyOtpThunk,
} from "../Redux/Auth/LoginSlice";

function ForgatPass() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState({
    visibility: "hidden",
  });
  const [visible, setVisible] = useState({
    visibility: "hidden",
    position: "absolute",
  });

  const [data, setData] = useState({
    email: "",
    otp: "",
    username: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    if (data.email === "") {
      toast.error("Please enter your Email");
      return;
    }
    try {
      const response = await dispatch(sendOtpThunk(data.email)).unwrap();
      toast.success("OTP sent successfully");
      setVisibility({ visibility: "visible" });
      return response;
    } catch (error) {
      setVisibility({ visibility: "hidden" });
      throw new Error(error);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (data.otp === "" || data.email === "") {
      toast.error("Enter Correct Email & OTP");
      return;
    }
    const verifyData = {
      email: data.email,
      otp: data.otp,
    };
    try {
      const response = await dispatch(verifyOtpThunk(verifyData)).unwrap();
      toast.success("OTP Verify Successfully");
      setVisible({ visibility: "visible" });
      return response;
    } catch (error) {
      setVisible({ visibility: "hidden" });
      throw new Error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      data.email === "" ||
      data.username === "" ||
      data.newPassword === "" ||
      data.confirmPassword === ""
    ) {
      toast.error("Please fill all fields");
      return;
    }
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const resetData = {
      email: data.email,
      username: data.username,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };
    try {
      const response = await dispatch(resetUserThunk(resetData)).unwrap();
      toast.success("Username & Password update Successfully");
      navigate("/login");
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <div className="flex justify-between ">
        <div className="w-full md:w-1/2 flex flex-col justify-top gap-2 pt-10 items-center">
          <h1 className="text-xl font-bold text-sky-500">
            Create New Username and Password
          </h1>
          <p className="text-lg font-semibold text-center">
            <span className="text-green-500">
              Please enter your correct email
            </span>
            <span className="text-sky-700"> & </span>
            <span className="text-pink-600">
              we'll send you an <br /> OTP to reset
            </span>
            <span className="text-green-500"> your Username & Password</span>
          </p>
          <div className="join">
            <div>
              <label className="input validator join-item">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  onChange={handleInput}
                  name="email"
                  value={data.email}
                  type="email"
                  placeholder="mail@site.com"
                  required
                  className="w-full outline-none"
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>
            <button
              onClick={handleOtp}
              className="btn btn-neutral px-7 join-item"
            >
              Send OTP
            </button>
          </div>
          <div className="join" style={visibility}>
            <div>
              <label className="input validator join-item">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="14" height="10" x="5" y="10" rx="2"></rect>
                    <path d="M8 10V7a4 4 0 1 1 8 0v3"></path>
                  </g>
                </svg>

                <input
                  onChange={handleInput}
                  name="otp"
                  value={data.otp}
                  type="otp"
                  placeholder="Enter OTP"
                  required
                  className="w-full outline-none"
                />
              </label>
            </div>
            <button
              onClick={verifyOtp}
              className="btn btn-neutral px-6 join-item"
            >
              Verify OTP
            </button>
          </div>
          <div
            className="w-full flex flex-col justify-center gap-2 items-center"
            style={visible}
          >
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                onChange={handleInput}
                name="username"
                value={data.username}
                type="input"
                required
                placeholder="Username"
              />
            </label>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                onChange={handleInput}
                name="newPassword"
                value={data.newPassword}
                type="password"
                required
                placeholder="New Password"
              />
            </label>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                onChange={handleInput}
                name="confirmPassword"
                value={data.confirmPassword}
                type="password"
                required
                placeholder="Confirm Password"
              />
            </label>
            <button
              onClick={handleSubmit}
              className="btn border-t-2 border-b-2 border-0 rounded-2xl bg-indigo-950/90 px-10 border-green-600"
            >
              Submit
            </button>
          </div>
          <div className="flex gap-4">
            <NavLink
              to="/login"
              className="btn border-t-2 border-b-2 border-0 rounded-2xl bg-indigo-950/90 px-10 border-white hover:border-amber-300"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="btn border-t-2 border-b-2 border-0 rounded-2xl bg-indigo-950/90 px-8 border-white hover:border-amber-300"
            >
              SignUp
            </NavLink>
          </div>
        </div>
        <div className="hidden md:block w-1/2">
          <AuthImagePattern
            tittle="join our Community"
            subtitle="Connect with friends, share moment, and stay, in touch with your friends"
          />
        </div>
      </div>
    </>
  );
}

export default ForgatPass;
