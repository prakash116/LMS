import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  deleteStudentThunk,
  getAllStudentThunk,
  getStudentThunk,
} from "../Redux/Student/StudentSlice";
import { ImCross } from "react-icons/im";
import StudentDetail from "../Components/StudentDetail";

function AllStudent() {
  const [studentData, setStudentData] = useState([]);
  const [showDetails, setShowDetails] = useState({ visibility: "hidden" });
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loginSlice);
  const id = user?.id;

  useEffect(() => {
    if (id) {
      fetchAllStudent(id);
    }
  }, [id]);

  const fetchAllStudent = async (id) => {
    try {
      const response = await dispatch(getAllStudentThunk(id)).unwrap();
      setData(response.data || []);
    } catch (error) {
      toast.error("Failed to fetch courses");
      throw new Error(error);
    }
  };

  const handleDetail = async (sid) => {
    try {
      const response = await dispatch(getStudentThunk(sid)).unwrap();
      setStudentData(response.data);
      setShowDetails({ visibility: "visible" });
      return response;
    } catch (error) {
      setShowDetails({ visibility: "hidden" });
      throw new Error(error);
    }
  };
  const close = () => {
    setShowDetails({ visibility: "hidden" });
  };

  const handleDelete = async (sid) => {
    try {
      const response = await dispatch(deleteStudentThunk(sid)).unwrap();
      toast.success("Student deleted");
      fetchAllStudent(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap min-h-[80vh] bg-indigo-950 justify-around gap-2 p-2">
        {data.length > 0 ? (
          data
            .slice()
            .reverse()
            .map((student, index) => (
              <div
                key={index}
                className="w-55 h-67 border-1 rounded-md shadow-md bg-indigo-950 text-green-500"
              >
                {student.studentProfile ? (
                  <embed
                    src={`http://localhost:8585/student/${student.studentProfile}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="object-cover object-center w-full rounded-t-md h-30 dark:bg-gray-500"
                  />
                ) : (
                  <img
                    src="https://source.unsplash.com/random/300x300/?education"
                    alt="Course"
                    className="object-cover object-center w-full rounded-t-md h-40 dark:bg-gray-500"
                  />
                )}
                <div className="flex flex-col justify-between p-2 space-y-1">
                  <h2 className="text-lg font-semibold tracking-wide">
                    Name : {student.studentName || "Untitled Course"}
                  </h2>
                  <p className="text-gray-100">
                    Course :{" "}
                    {student.studentCourse || "No description available."}
                  </p>
                  <p className="text-gray-100">
                    Phone :{" "}
                    {student.studentMobile || "No description available."}
                  </p>
                </div>
                <div className="flex gap-2 p-1">
                  <button
                    onClick={() => handleDetail(student._id)}
                    type="button"
                    className="flex items-center justify-center w-full p-1 font-semibold tracking-wide rounded-md dark:bg-red-600 dark:text-gray-50"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(student._id)}
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
      <div
        className="flex justify-center  items-center h-[85vh] fixed top-20 w-full bg-black/80"
        style={showDetails}
      >
        <h1
          onClick={close}
          className="absolute z-40 p-3 top-20 right-50 hover:bg-red-500 rounded-full"
        >
          <ImCross />
        </h1>
        <StudentDetail data={studentData} />
      </div>
    </>
  );
}

export default AllStudent;
