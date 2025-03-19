import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdminThunk } from "../Redux/Admin/AdminSlice";
import { createFacultyThunk } from "../Redux/Faculty/FacultySlice";
import { useNavigate } from "react-router-dom";

function FacultyRegister() {
  const [data, setData] = useState([]);
  const [showAdminList, setShowAdminList] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.adminSlice.adminData);

  const handleRef = () => {
    dispatch(getAllAdminThunk());
    setShowAdminList(!showAdminList);
  };

  const handleSelectAdmin = (id) => {
    setInfo((prev) => ({
      ...prev,
      adminId: id,
    }));
    setShowAdminList(false);
    setSelectedAdmin(id);
  };

  useEffect(() => {
    setData(admin.data);
  }, [admin]);

  // Faculty Register
  const [info, setInfo] = useState({
    facultyName: "",
    facultyProfession: "",
    facultyEmail: "",
    facultyMobile: "",
    facultyCity: "",
    adminId: "",
    facultyProfile: "",
  });

  const handleInput = (e) => {
    const { name, value, files, type } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const [fid, setFid] = useState(null);
  const [visible, setVisible] = useState({ visibility: "hidden" });
  const handleSubmit = async (e) => {
    setVisible({ visibility: "visible" });
    e.preventDefault();
    const formData = new FormData();
    formData.append("facultyName", info.facultyName);
    formData.append("facultyProfession", info.facultyProfession);
    formData.append("facultyEmail", info.facultyEmail);
    formData.append("facultyMobile", info.facultyMobile);
    formData.append("facultyCity", info.facultyCity);
    formData.append("adminId", info.adminId);
    formData.append("facultyProfile", info.facultyProfile);

    try {
      const response = await dispatch(createFacultyThunk(formData)).unwrap();
      setFid(response?.data?.data?._id);
      return response;
    } catch (e) {
      setVisible({ visibility: "hidden" });
      throw new Error(e);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (fid !== null) {
      navigate(`/create-id/?id=${fid}`);
    }
  }, [fid]);

  return (
    <>
      <div
        className="w-full h-full flex bg-black/80 justify-center items-center fixed top-0 left-0 z-50"
        style={visible}
      >
        <div className="w-40 h-40 bg-indigo-400 rounded-lg flex flex-col justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
          <h1>Send Mail Verification</h1>
        </div>
      </div>
      <div className="bg-[url(/Images/adminR.jpg)] bg-cover bg-center flex flex-col justify-center items-center min-h-screen p-4">
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold bg-green-600 p-2 px-10 rounded-t-xl">
            Faculty Information
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
          className="bg-indigo-950/80 flex flex-col gap-4 py-8 px-6 rounded-xl w-full max-w-2xl mt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                onChange={handleInput}
                value={info.facultyName}
                name="facultyName"
                type="text"
                placeholder="Name"
                className="input input-primary w-full"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Profession</label>
              <input
                onChange={handleInput}
                value={info.facultyProfession}
                name="facultyProfession"
                type="text"
                placeholder="Profession"
                className="input input-primary w-full"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Contact</label>
              <input
                onChange={handleInput}
                value={info.facultyMobile}
                name="facultyMobile"
                type="text"
                placeholder="Contact"
                className="input input-primary w-full"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                onChange={handleInput}
                value={info.facultyEmail}
                name="facultyEmail"
                type="email"
                placeholder="Email"
                className="input input-primary w-full"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">City</label>
              <input
                onChange={handleInput}
                value={info.facultyCity}
                name="facultyCity"
                type="text"
                placeholder="City"
                className="input input-primary w-full"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Profile Photo</label>
              <input
                onChange={handleInput}
                name="facultyProfile"
                type="file"
                className="file-input file-input-primary w-full"
              />
            </div>
          </div>
          <div className="w-full flex mt-4">
            <input
              readOnly
              value={selectedAdmin || "Click to Select an Admin Reference"}
              className="w-full border border-blue-600 rounded-l-md p-2"
            />
            <button
              type="button"
              onClick={handleRef}
              className="pl-3 p-2 bg-blue-800 rounded-r-md"
            >
              Reference
            </button>
          </div>
          <button type="submit" className="btn btn-success mt-4">
            Submit
          </button>
        </form>

        {showAdminList && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-40">
            <div className="bg-zinc-900/90 w-full max-w-md h-[80vh] p-4 rounded-xl shadow-lg overflow-y-auto">
              <h1 className="text-center font-bold text-lg text-white mb-2">
                Admin List
              </h1>
              <hr className="border-gray-400" />
              {Array.isArray(data) && data.length > 0 ? (
                <div className="h-[70vh] overflow-y-auto">
                  {data.map((user, index) => (
                    <div
                      key={index}
                      className="flex w-full p-2 justify-between items-center border-b border-gray-600 text-white"
                    >
                      <img
                        src={user.profilePic || "/default-avatar.png"}
                        alt="Admin"
                        className="w-10 h-10 rounded-full bg-red-200 m-1"
                      />
                      <p className="font-semibold flex justify-start">
                        {user.adminName}
                      </p>
                      <button
                        onClick={() => handleSelectAdmin(user._id)}
                        className="btn btn-success text-sm px-2"
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-white mt-4">No Reference</div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FacultyRegister;