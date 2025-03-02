import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, loginThunk } from "../Redux/Auth/LoginSlice";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login1() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [user, setUser] = useState();
  const [visible, setVisible] = useState({ visibility: "hidden" });
  const handleSubmit = async (e) => {
    setVisible({ visibility: "visible" });
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    try {
      const response = await dispatch(loginThunk(formData)).unwrap();
      setUser(response);
      toast.success("Login successfully")
    } catch (error) {
      setVisible({ visibility: "hidden" });
      throw new Error(error);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (user !== undefined) {
      if (user.data.data.role === "admin") {
        const data = {
          id: user.data.data.userId,
          role: user.data.data.role,
        };
        dispatch(login(data));
        navigate("/admin-dashbord");
      }
      if (user.data.data.role === "faculty") {
        const data = {
          id: user.data.data.userId,
          role: user.data.data.role,
        };
        dispatch(login(data));
        const id = user.data.data.userId;
        navigate("/faculty-dashbord");
      }

      if (user.data.data.role === "student") {
        const data = {
          id: user.data.data.userId,
          role: user.data.data.role,
        };
        dispatch(login(data));
        const id = user.data.data.userId;
        navigate("/dashbord");
      }
    }
  }, [user]);

  return (
    <>
      <div
        className="w-full h-full flex bg-black/80 justify-center items-center absolute"
        style={visible}
      >
        <div className="w-40 h-40 bg-indigo-400 rounded-lg flex flex-col justify-center items-center -mt-20">
          <span className="loading loading-bars loading-lg"></span>
          <h1>Check ID</h1>
        </div>
      </div>
      <div className="flex justify-center items-center bg-[url(/Images/login.jpg)] bg-contain bg-center h-[80vh] w-full">
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col w-1/3 rounded-xl border-b-2 border-t-2 hover:border-amber-300 bg-zinc-950/95 py-4 px-10 items-center"
        >
          <h1 className="font-bold text-3xl mb-8">Login</h1>
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
              type="text"
              required
              placeholder="Username"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              // minlength="3"
              // maxlength="30"
              title="Only letters, numbers or dash"
            />
          </label>

          <p className="validator-hint">
            Must be 3 to 30 characters
            <br />
            containing only letters, numbers or dash
          </p>

          <label className="input validator mt-1">
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
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              onChange={handleInput}
              name="password"
              value={data.password}
              type="password"
              required
              placeholder="Password"
              // minlength="4"
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number
            <br />
            At least one lowercase letter
            <br />
            At least one uppercase letter
          </p>
          <div className="w-full p-3 mt-4">
            <button className="btn btn-outline w-full btn-success">
              Success
            </button>
          </div>
          <h1 className=" flex gap-4">
            <NavLink to="/register" href="" className="text-cyan-300">
              Sign Up
            </NavLink>
            <NavLink to="/forgat" className="text-red-500">
              Forgat Password
            </NavLink>
          </h1>
        </form>
      </div>
    </>
  );
}

export default Login1;
