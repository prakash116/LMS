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
      // console.log(e);
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
        className="w-full h-full flex bg-black/80 justify-center items-center absolute"
        style={visible}
      >
        <div className="w-40 h-40 bg-indigo-400 rounded-lg flex flex-col justify-center items-center -mt-20">
          <span className="loading loading-bars loading-lg"></span>
          <h1>Send Mail Verification</h1>
        </div>
      </div>
      <div className="bg-[url(/Images/adminR.jpg)] bg-center flex flex-col justify-center w-full items-center min-h-[90vh]">
        <div className="flex flex-col items-center absolute -mt-89">
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
          className="bg-indigo-950/80 flex flex-col gap-2 py-8 px-8 rounded-xl"
        >
          <table className="font-semibold">
            <tbody>
              <tr>
                <td>Name</td>
                <td>Profession</td>
              </tr>
              <tr>
                <td>
                  <input
                    onChange={handleInput}
                    value={info.facultyName}
                    name="facultyName"
                    type="text"
                    placeholder="Name"
                    className="input input-primary w-60 mr-6"
                  />
                </td>
                <td>
                  <input
                    onChange={handleInput}
                    value={info.facultyProfession}
                    name="facultyProfession"
                    type="text"
                    placeholder="Profession"
                    className="input input-primary w-60"
                  />
                </td>
              </tr>
              <tr>
                <td>Contact</td>
                <td>Email</td>
              </tr>
              <tr>
                <td>
                  <input
                    onChange={handleInput}
                    value={info.facultyMobile}
                    name="facultyMobile"
                    type="text"
                    placeholder="Contact"
                    className="input input-primary w-60 mr-6"
                  />
                </td>
                <td>
                  <input
                    onChange={handleInput}
                    value={info.facultyEmail}
                    name="facultyEmail"
                    type="email"
                    placeholder="Email"
                    className="input input-primary w-60"
                  />
                </td>
              </tr>
              <tr>
                <td>City</td>
                <td>Profile Photo</td>
              </tr>
              <tr>
                <td>
                  <input
                    onChange={handleInput}
                    value={info.facultyCity}
                    name="facultyCity"
                    type="text"
                    placeholder="City"
                    className="input input-primary w-60 mr-6"
                  />
                </td>
                <td>
                  <input
                    onChange={handleInput}
                    name="facultyProfile"
                    type="file"
                    className="file-input file-input-primary w-60"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="w-full flex">
            <input
              readOnly
              value={selectedAdmin || "Click to Select an Admin Reference"}
              className="w-[83%] border border-blue-600 rounded-l-md p-1"
            />
            <button
              type="button"
              onClick={handleRef}
              className="pl-3 p-1 bg-blue-800 rounded-r-md"
            >
              Reference
            </button>
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>

        {showAdminList && (
          <div className="absolute bg-zinc-900/90 w-[300px] h-[78vh] p-4 rounded-xl shadow-lg">
            <h1 className="text-center font-bold text-lg text-white mb-2">
              Admin List
            </h1>
            <hr className="border-gray-400" />
            {Array.isArray(data) && data.length > 0 ? (
              <div className="h-[72vh] overflow-y-auto">
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
                    <p className="font-semibold flex justifly-start">
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
        )}
      </div>
    </>
  );
}

export default FacultyRegister;
