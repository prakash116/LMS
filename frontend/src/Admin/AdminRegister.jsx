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
    <div className="w-full h-full flex bg-black/80 justify-center items-center absolute" style={visible}>
        <div className="w-40 h-40 bg-indigo-400 rounded-lg flex flex-col justify-center items-center -mt-20">
          <span className="loading loading-bars loading-lg"></span>
          <h1>Send Mail Verification</h1>
        </div>
      </div>
    <div className="bg-[url(/Images/adminR.jpg)] bg-center flex flex-col justify-center w-full items-center h-[80vh]">
      <div className="flex flex-col items-center absolute -mt-82">
        <h1 className="text-lg font-bold bg-green-600 p-2 px-10 rounded-t-xl">
          Admin Information
        </h1>
        <div
          className="w-0 h-0 
           border-l-[15px] border-l-transparent
           border-t-[20px] border-t-green-600
           border-r-[15px] border-r-transparent"
        ></div>
        <div className="w-2 h-2 rounded-full bg-green-500 -mt-1"></div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-indigo-950/80 flex flex-col gap-2 py-10 px-30 rounded-xl"
      >
        <div className="flex items-center justify-center gap-7">
          <label>Name: </label>
          <input
            onChange={handleInput}
            value={data.adminName}
            name="adminName"
            type="text"
            placeholder="Name"
            className="input input-primary"
          />
        </div>
        <div className="flex items-center justify-center gap-8">
          <label>Email: </label>
          <input
            onChange={handleInput}
            value={data.adminEmail}
            name="adminEmail"
            type="text"
            placeholder="Email"
            className="input input-primary"
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <label>Number: </label>
          <input
            onChange={handleInput}
            value={data.adminNumber}
            name="adminNumber"
            type="text"
            placeholder="Number"
            className="input input-primary"
          />
        </div>
        <div className="flex items-center justify-center gap-6">
          <label>Profile: </label>
          <input
            onChange={handleInput}
            name="adminProfile"
            type="file"
            className="file-input file-input-primary"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
    
    </>
  );
}

export default AdminRegister;
