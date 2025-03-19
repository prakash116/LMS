import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { deleteFacultyThunk, getAllFacultyThunk, getFaucultyThunk } from "../Redux/Faculty/FacultySlice";
import FacultyDetail from "../Components/FacultyDetail";
import { ImCross } from "react-icons/im";

function AllFaculty() {
  const [facultyData, setFacultyData] = useState([])
  const [showDetails, setShowDetails] = useState({visibility: "hidden"})
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loginSlice);
  const id = user?.id;

  useEffect(() => {
    if (id) {
      fetchAllFaculty(id);
    }
  }, [id]);

  const fetchAllFaculty = async (id) => {
    try {
      const response = await dispatch(getAllFacultyThunk(id)).unwrap();
      setData(response.data || []);
    } catch (error) {
      toast.error("Failed to fetch courses");
      throw new Error(error);
      
    }
  };

  const handleDelete = async(fid) => {
    const ids = {
      aid: id,
      fid: fid,
    }
    try {
      const response = await dispatch(deleteFacultyThunk(ids)).unwrap();
      fetchAllFaculty(id);
      toast.success("Faculty deleted successfully")
      return response
    } catch (error) {
      throw new Error("Failed to delete", error);
    }
  }

  const handleDetail = async(fid) => {
    try {
      const response = await dispatch(getFaucultyThunk(fid)).unwrap();
      setFacultyData(response?.data?.data)
      setShowDetails({visibility: "visible"});
    } catch (error) {
      setShowDetails({visibility: "hidden"});
      throw new Error(error);
    }
  }

  const close = () => {
    setShowDetails({visibility: "hidden"});
  }

  return (
    <>
      <div className="flex flex-wrap justify-around min-h-[80vh] pt-5 bg-indigo-950 gap-2 p-2">
        {data?.length > 0 ? (
          data
            .slice()
            .reverse()
            .map((faculty, index) => (
              <div
                key={index}
                className="w-66 border-1 h-85 rounded-md shadow-md bg-indigo-950 text-green-500"
              >
                {faculty.facultyProfile ? (
                  <embed
                    src={`http://localhost:8585/faculty/${faculty.facultyProfile}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="object-cover object-center w-full rounded-t-md h-40 dark:bg-gray-500"
                  />
                ) : (
                  <img
                    src="https://source.unsplash.com/random/300x300/?education"
                    alt="Course"
                    className="object-cover object-center w-full rounded-t-md h-40 dark:bg-gray-500"
                  />
                )}
                <div className="flex flex-col justify-between p-2 space-y-1">
                  <h2 className="text-xl font-semibold tracking-wide">
                    Name : {faculty.facultyName || "Untitled Course"}
                  </h2>
                  <p className="text-gray-100">
                    Role : {faculty.facultyProfession || "No description available."}
                  </p>
                  <p className="text-gray-100">
                    Phone : {faculty.facultyMobile || "No description available."}
                  </p>
                  <p className="text-gray-100">
                    Join Date : { faculty.createdAt
                      ?  faculty.createdAt.split("T")[0]
                      :  "No description."}
                  </p>
                </div>
                <div className="flex gap-2 p-1">
                  <button
                    onClick={() => handleDetail(faculty._id)}
                    type="button"
                    className="flex items-center justify-center w-full p-1 font-semibold tracking-wide rounded-md dark:bg-red-600 dark:text-gray-50"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(faculty._id)}
                    className="flex items-center justify-center w-full p-1 font-semibold tracking-wide rounded-md dark:bg-red-600 dark:text-gray-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p className="text-white">Loading...</p>
        )}
      </div>
      <div className="flex justify-center  items-center h-[85vh] fixed top-20 w-full bg-black/80" style={showDetails}>
        <h1 onClick={close} className="absolute z-40 p-3 top-20 right-50 hover:bg-red-500 rounded-full">
        <ImCross/>
        </h1>
        <FacultyDetail data={facultyData}/>
      </div>
    </>
  );
}

export default AllFaculty;