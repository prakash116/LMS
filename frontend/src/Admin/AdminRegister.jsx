import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAdminThunk } from "../Redux/Admin/AdminSlice";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

function AdminRegister() {
  const [id, setId] = useState(null);
  const [data, setData] = useState({
    adminName: "",
    adminEmail: "",
    adminNumber: "",
    adminProfile: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInput = (e) => {
    const { name, value, files, type } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const [visible, setVisible] = useState({"visibility":"hidden"})
  const handleSubmit = async (e) => {
    e.preventDefault();
    setVisible({ "visibility": "visible" })
    if (
      data.adminName &&
      data.adminEmail &&
      data.adminNumber &&
      data.adminProfile
    ) {
      const formData = new FormData();
      formData.append("adminName", data.adminName);
      formData.append("adminEmail", data.adminEmail);
      formData.append("adminNumber", data.adminNumber);
      formData.append("adminProfile", data.adminProfile);

      try {
        const response = await dispatch(createAdminThunk(formData)).unwrap();
        if (response.data && response.data._id) {
          setId(response.data._id);
        }
      } catch (error) {
        setVisible({ "visibility" : "hidden"})
        if (error.message === "Error: Email already exists") {
          toast.success("Email already exists");
        } else {
          toast.error("Failed to create admin. Please try again.");
        }
      }
    } else {
      setVisible({ "visibility" : "hidden"})
      toast.error("Please fill all fields!");
    }
  };
  
  const { adminData } = useSelector((state) => state.adminSlice);
  useEffect(() => {
    if (adminData.length > 0) {
      setId(adminData[0].data._id);
    }
  }, [adminData]);

  useEffect(() => {
    if (id) {
      navigate(`/create-id/?id=${id}`);
    }
  }, [id, navigate]);

  return (
    <>
  {/* Loading Overlay */}
  <div className="w-full h-full flex bg-black/80 justify-center items-center absolute" style={visible}>
    <div className="w-40 h-40 bg-indigo-400 rounded-lg flex flex-col justify-center items-center -mt-20">
      <span className="loading loading-bars loading-lg"></span>
      <h1 className="text-sm sm:text-base">Send Mail Verification</h1>
    </div>
  </div>

  {/* Admin Information Form */}
  <div className="bg-[url(/Images/adminR.jpg)] bg-cover bg-center flex flex-col justify-center w-full items-center h-[80vh]">
    {/* Admin Information Header */}
    <div className="flex flex-col items-center absolute -mt-110 md:-mt-83">
      <h1 className="text-sm sm:text-lg font-bold bg-green-600 p-2 px-6 sm:px-10 rounded-t-xl">
        Admin Information
      </h1>
      <div
        className="w-0 h-0 
         border-l-[10px] sm:border-l-[15px] border-l-transparent
         border-t-[15px] sm:border-t-[20px] border-t-green-600
         border-r-[10px] sm:border-r-[15px] border-r-transparent"
      ></div>
      <div className="w-2 h-2 rounded-full bg-green-500 -mt-1"></div>
    </div>

    {/* Form */}
    <form
      onSubmit={handleSubmit}
      className="bg-indigo-950/85 flex  flex-col gap-2 py-6 px-4 sm:py-10 sm:px-21 rounded-xl w-full max-w-lg mx-4"
    >
      {/* Name Input */}
      <div className="flex flex-col w-full sm:flex-row items-center justify-center gap-2 sm:gap-7">
        <label className="sm:w-auto w-full">Name: </label>
        <input
          onChange={handleInput}
          value={data.adminName}
          name="adminName"
          type="text"
          placeholder="Name"
          className="input input-primary w-full"
        />
      </div>

      {/* Email Input */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8">
        <label className="w-full sm:w-auto">Email: </label>
        <input
          onChange={handleInput}
          value={data.adminEmail}
          name="adminEmail"
          type="text"
          placeholder="Email"
          className="input input-primary w-full"
        />
      </div>

      {/* Number Input */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
        <label className="w-full sm:w-auto">Number: </label>
        <input
          onChange={handleInput}
          value={data.adminNumber}
          name="adminNumber"
          type="text"
          placeholder="Number"
          className="input input-primary w-full"
        />
      </div>

      {/* Profile Input */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
        <label className="w-full sm:w-auto">Profile: </label>
        <input
          onChange={handleInput}
          name="adminProfile"
          type="file"
          className="file-input file-input-primary w-full sm:w-auto"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-success mt-4">
        Submit
      </button>
    </form>
  </div>
</>
  );
}

export default AdminRegister;
