import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseThunk,
  getAllCourseThunk,
} from "../Redux/Course/CourseSlice";
import toast from "react-hot-toast";
import CourseUpdate from "../Faculty/CourseUpdate";

function GetAllCourse({btn}) {
  const [showUpdate, setShowUpdate] = useState(false);
  const [data, setData] = useState([]);
  const [fid, setFid] = useState();
  const { user } = useSelector((state) => state.loginSlice);
  const dispatch = useDispatch();
  const ids = user?.id;
  useEffect(() => {
    if (user && user.role === "faculty" && user.id) {
      setFid(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (fid) {
      fetchData(fid);
    }
  }, [ids, showUpdate, fid, btn]);

  const fetchData = async (id) => {
    try {
      const response = await dispatch(getAllCourseThunk(id)).unwrap();
      setData(response.data || []);
    } catch (error) {
      toast.error("Failed to fetch courses");
    }
  };

  const handleDelete = async (sid) => {
    const ids = {
      cid: sid,
      fid: fid,
    };
    try {
      await dispatch(deleteCourseThunk(ids)).unwrap();
      toast.success("Course deleted successfully");
      fetchData(fid);
    } catch (error) {
      toast.error("Failed to delete course");
      throw new Error(error);
    }
  };

  const [id, setID] = useState({
    cid: null,
    fid: null,
  });
  const handleUpdate = (cid) => {
    setID({ cid: cid, fid: fid });
    setShowUpdate(true);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-around gap-2 p-2">
          {data.length > 0 ? (
            data
              .slice()
              .reverse()
              .map((course, index) => (
                <div
                  key={index}
                  className="w-60 h-79 border-1 rounded-md shadow-md bg-indigo-950 text-green-500"
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
                  <div className="flex flex-col justify-between p-2 space-y-1">
                    <h2 className="text-xl font-semibold tracking-wide">
                      {course.courseTitle || "Untitled Course"}
                    </h2>
                    <p className="text-gray-100">
                      {course.courseContent || "No description available."}
                    </p>
                    <button
                      type="button"
                      className="flex items-center justify-center w-full p-1 font-semibold tracking-wide rounded-md dark:bg-pink-600 dark:text-gray-50"
                    >
                      Read more
                    </button>
                  </div>
                  <div className="flex gap-2 p-1">
                    <button
                      onClick={() => handleUpdate(course._id)}
                      type="button"
                      className="flex items-center justify-center w-full p-1 font-semibold tracking-wide rounded-md dark:bg-red-600 dark:text-gray-50"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(course._id)}
                      className="flex items-center justify-center w-full p-1 font-semibold tracking-wide rounded-md dark:bg-red-600 dark:text-gray-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-white">No courses available.</p>
          )}
        </div>
      </div>
      <div
        className="top-10 fixed flex justify-center items-center z-40"
        style={{ visibility: showUpdate ? "visible" : "hidden" }}
      >
        <CourseUpdate setShowUpdate={setShowUpdate} id={id} />
      </div>
    </>
  );
}

export default GetAllCourse;
