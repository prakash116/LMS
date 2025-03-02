import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createIdThunk } from "../Redux/Auth/LoginSlice";
import toast from "react-hot-toast";

function CreateID() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [val, setVal] = useState();
  useEffect(() => {
    if (val !== undefined) {
      navigate("/login");
    }
  }, [val]);

  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !data.username ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const payload = new FormData();
    payload.append("email", data.email);
    payload.append("username", data.username);
    payload.append("password", data.password);
    payload.append("id", id);
    try {
      const response = await dispatch(createIdThunk(payload)).unwrap();
      setVal(response);
      toast.success("User created successfully");
    } catch (error) {
      toast.error("Failed to create user");
      throw new Error(error);
    }
  };

  return (
    <div className="bg-[url(/Images/Login.jpeg)] bg-center flex flex-col justify-center w-full items-center h-[80vh]">
      <img
        src="/Images/img.png"
        alt="logo"
        className="w-20 h-20 rounded-full absolute -mt-85 bg-white"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-indigo-950/95 w-1/2 flex flex-col gap-2 py-10 px-20 rounded-xl"
      >
        <div className="flex items-center justify-center gap-6">
          <label>Username:</label>
          <input
            onChange={handleInput}
            value={data.username}
            name="username"
            type="text"
            placeholder="Username"
            className="input input-primary"
          />
        </div>
        <div className="flex items-center justify-center gap-14">
          <label>Email:</label>
          <input
            onChange={handleInput}
            value={data.email}
            name="email"
            type="email"
            placeholder="Email"
            className="input input-primary"
          />
        </div>
        <div className="flex items-center justify-center gap-7">
          <label>Password:</label>
          <input
            onChange={handleInput}
            value={data.password}
            name="password"
            type="password"
            placeholder="Password"
            className="input input-primary"
          />
        </div>
        <div className="flex items-center justify-center gap-1">
          <label>Confirm Pass:</label>
          <input
            onChange={handleInput}
            value={data.confirmPassword}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="input input-primary"
          />
        </div>
        <div className="w-full px-5">
          <button type="submit" className="w-full btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateID;
