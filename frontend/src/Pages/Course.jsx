import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allCoursesThunk } from "../Redux/Course/CourseSlice";
import { NavLink } from "react-router-dom";

function Course() {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.courseSlice);
  useEffect(() => {
    dispatch(allCoursesThunk());
  }, [dispatch]);

  const data = courseData?.data; // Use optional chaining to avoid errors if `courseData` is undefined
  return (
    <div className="p-4 min-h-svh flex flex-wrap bg-indigo-950 justify-around">
      {data && data.length > 0 ? (
        data
          .slice()
          .reverse()
          .map((course) => (
            <div
              key={course._id} // Use a unique key for each course
              className="w-70 rounded-md shadow-md bg-indigo-900/40 border-1 hover:border-amber-200 text-gray-100 mb-4"
            >
              <img
                src={`http://localhost:8585/course/${course.coursePdf}`}
                alt=""
                className="object-cover object-center w-full rounded-t-md h-40"
              />
              <div className="flex flex-col justify-between p-4 space-y-2">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-wide">
                    {course.courseTitle}
                  </h2>
                  <p>{course.courseContent}</p>
                </div>
                <div className="flex gap-2">
                  <NavLink
                    to="/register"
                    type="button"
                    className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md border-r-2 border-l-2 hover:border-amber-200 dark:bg-violet-800 dark:text-gray-50"
                  >
                    Read More
                  </NavLink>
                  <NavLink
                    to="/register"
                    type="button"
                    className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md border-r-2 border-l-2 hover:border-amber-200 dark:bg-violet-800 dark:text-gray-50"
                  >
                    Buy Now
                  </NavLink>
                </div>
              </div>
            </div>
          ))
      ) : data && data.length > 0 ? (
        <>
          <p className="text-white">Loading...</p>
        </>
      ) : (
        <>
          <p className="text-3xl">No Data</p>
        </>
      )}
    </div>
  );
}

export default Course;
