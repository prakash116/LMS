import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { getCourseByIdThunk, updateCourseThunk } from "../Redux/Course/CourseSlice";
import toast from "react-hot-toast";

function CourseUpdate({ setShowUpdate, id }) {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.courseSlice);

  const [data, setData] = useState({
    courseTitle: "",
    courseContent: "",
    courseAuthor: "",
    coursePrice: "",
    facultyId: "",
    coursePdf: null,
  });

  const [ids, setIds] = useState({ fid: "", cid: "" });

  // Fetch Course Data
  useEffect(() => {
    dispatch(getCourseByIdThunk(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (courseData?.course) {
      setData({
        courseTitle: courseData.course.courseTitle || "",
        courseContent: courseData.course.courseContent || "",
        courseAuthor: courseData.course.courseAuthor || "",
        coursePrice: courseData.course.coursePrice || "",
        facultyId: courseData.course.facultyId || "",
        coursePdf: courseData.course.coursePdf || null,
      });
      setIds({
        fid: courseData.course.facultyId,
        cid: courseData.course._id,
      });
    }
  }, [courseData]);

  // Handle Input Change
  const handleInput = (e) => {
    const { name, value, files, type } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseTitle", data.courseTitle);
    formData.append("courseContent", data.courseContent);
    formData.append("courseAuthor", data.courseAuthor);
    formData.append("coursePrice", data.coursePrice);
    formData.append("facultyId", data.facultyId);
    formData.append("coursePdf", data.coursePdf);
    formData.append("cid", ids.cid);
    formData.append("fid", ids.fid);

    try {
      const response = await dispatch(updateCourseThunk(formData)).unwrap();
      toast.success("Course updated successfully");
      setShowUpdate(false);
      setData({
        courseTitle: "",
        courseContent: "",
        courseAuthor: "",
        coursePrice: "",
        facultyId: "",
        coursePdf: null,
      });
      return response;
    } catch (error) {
      toast.error("Failed to update course");
      throw new Error(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-800/90 p-4 flex justify-center items-center font-serif">
      <div className="bg-zinc-950/70 border-t-2 border-b-2 rounded-lg p-6 w-full max-w-4xl">
        <div className="flex justify-center pb-4">
          <h1 className="border-b-1 w-fit rounded-2xl px-4 bg-zinc-800 p-1">
            Update Course Information
          </h1>
        </div>

        {setShowUpdate && (
          <div
            onClick={() => setShowUpdate(false)}
            className="flex justify-end items-end absolute top-8 right-5 md:top-30 md:right-10 p-2 rounded-full hover:bg-red-500 cursor-pointer"
          >
            <ImCross />
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-full">
            <div>
              <label>Course Title</label>
              <input
                name="courseTitle"
                type="text"
                placeholder="Type here"
                value={data.courseTitle}
                onChange={handleInput}
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div>
              <label>Course Content</label>
              <input
                name="courseContent"
                type="text"
                placeholder="Type here"
                value={data.courseContent}
                onChange={handleInput}
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div>
              <label>Course Author</label>
              <input
                name="courseAuthor"
                type="text"
                placeholder="Type here"
                value={data.courseAuthor}
                onChange={handleInput}
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div>
              <label>Faculty ID</label>
              <input
                name="facultyId"
                type="text"
                placeholder="Type here"
                value={data.facultyId}
                onChange={handleInput}
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div>
              <label>Course Price</label>
              <input
                name="coursePrice"
                type="text"
                placeholder="Type here"
                value={data.coursePrice}
                onChange={handleInput}
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div>
              <label>Course PDF</label>
              <input
                onChange={handleInput}
                name="coursePdf"
                type="file"
                className="file-input file-input-bordered file-input-info w-full"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-outline px-8 btn-success mt-4">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default CourseUpdate;