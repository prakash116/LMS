import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allCourseThunk,
  deleteCourseByIdThunk,
  getCourseDetailThunk,
} from "../Redux/Course/CourseSlice";
import toast from "react-hot-toast";
import CourseDetail from "../Components/CourseDetail";
import { ImCross } from "react-icons/im";

function AllCourse() {
  const [courseData, setCourseData] = useState([])
  const [showDetails, setShowDetails] = useState({visibility: "hidden"})
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loginSlice);
  const id = user?.id;

  useEffect(() => {
    if (id) {
      fetchAllCourse(id);
    }
  }, [id]);

  const fetchAllCourse = async (id) => {
    try {
      const response = await dispatch(allCourseThunk(id)).unwrap();
      setData(response.data || []);
    } catch (error) {
      toast.error("Failed to fetch courses");
    }
  };

  const handleDelete = async (cid) => {
    try {
      const response = await dispatch(deleteCourseByIdThunk(cid)).unwrap();
      toast.success("Course deleted successfully");
      fetchAllCourse(id);
      return response;
    } catch (error) {
      toast.error("Failed to delete");
      throw new Error(error);
    }
  };

  const handleDetails = async(cid) => {
    try {
      const response = await dispatch(getCourseDetailThunk(cid)).unwrap();
      setCourseData(response.data)
      setShowDetails({visibility: "visible"});
      return response;
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
      <div className="flex flex-wrap justify-around gap-2 p-2">
        {data.length > 0 ? (
          data
            .slice()
            .reverse()
            .map((course, index) => (
              <div
                key={index}
                className="w-70 h-87 border-1 rounded-md shadow-md bg-indigo-950 text-green-500"
              >
                {course.coursePdf ? (
                  <embed
                    src={`http://localhost:8585/course/${course.coursePdf}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="object-cover object-center w-full rounded-t-md h-40 dark:bg-gray-500"
                  />
                ) : (
                  <img
                    src="https://source.unsplash.com/random/300x300/?education"
                    alt="Course"
                    className="object-cover object-center w-full rounded-t-md h-40 dark:bg-gray-500"
                  />
                )}
                <div className="flex flex-col justify-between p-3 space-y-0.5">
                  <h2 className="text-lg font-semibold tracking-wide">
                    Title : {course.courseTitle || "Untitled Course"}
                  </h2>
                  <p className="text-gray-100">
                    Info : {course.courseContent || "No description available."}
                  </p>
                  <p className="text-gray-100">
                    Faculty :{" "}
                    {course.courseAuthor || "No description available."}
                  </p>
                  <p className="text-gray-100">
                    Update :
                    {course.updatedAt
                      ? course.updatedAt.split("T")[0]
                      : "No description available."}
                  </p>
                </div>
                <div className="flex gap-2 p-1">
                  <button
                    onClick={() => handleDetails(course._id)}
                    type="button"
                    className="flex items-center justify-center w-full py-2 p-1 font-semibold tracking-wide rounded-md dark:bg-red-600 dark:text-gray-50"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    type="button"
                    className="flex items-center justify-center w-full py-2 p-1 font-semibold tracking-wide rounded-md dark:bg-red-600 dark:text-gray-50"
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
        <CourseDetail data={courseData}/>
      </div>
    </>
  );
}

export default AllCourse;
