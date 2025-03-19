import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { createCourseThunk } from "../Redux/Course/CourseSlice";
import toast from "react-hot-toast";

function AddCourse({ btn }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loginSlice);
  const id = user.id;

  const [data, setData] = useState({
    courseTitle: "",
    courseContent: "",
    authorName: "",
    coursePrice: "",
    facultyId: id,
    coursePdf: null,
  });

  const handleInput = (e) => {
    const { name, value, files, type } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseTitle", data.courseTitle);
    formData.append("courseContent", data.courseContent);
    formData.append("courseAuthor", data.authorName);
    formData.append("coursePrice", data.coursePrice);
    formData.append("facultyId", data.facultyId);
    formData.append("coursePdf", data.coursePdf);

    try {
      const response = await dispatch(createCourseThunk(formData)).unwrap();
      toast.success("Course added successfully");
      btn({ visibility: "hidden" });
      setData({
        courseTitle: "",
        courseContent: "",
        authorName: "",
        coursePrice: "",
        facultyId: id,
        coursePdf: null,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <div className="bg-black/90 rounded-2xl border-2 border-white w-full md:w-[60vw] p-4 flex flex-col justify-around items-center">
        <h1 className="text-center text-xl font-bold mb-4">Add New Course</h1>
        <div className="flex justify-end items-end absolute z-40 top-15 right-8 md:top-35 md:right-80 p-1 rounded-full hover:bg-red-500 cursor-pointer">
          <ImCross onClick={() => btn({ visibility: "hidden" })} />
        </div>
        <form action="" className="w-full" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="">Course Title</label>
              <input
                onChange={handleInput}
                value={data.courseTitle}
                name="courseTitle"
                type="text"
                placeholder="Course Title"
                className="input input-primary w-full"
              />
            </div>
            <div>
              <label htmlFor="">Course Content</label>
              <input
                onChange={handleInput}
                value={data.courseContent}
                name="courseContent"
                type="text"
                placeholder="Course Content"
                className="input input-primary w-full"
              />
            </div>
            <div>
              <label htmlFor="">Author Name</label>
              <input
                onChange={handleInput}
                value={data.authorName}
                name="authorName"
                type="text"
                placeholder="Author Name"
                className="input input-primary w-full"
              />
            </div>
            <div>
              <label htmlFor="">Course Price</label>
              <input
                onChange={handleInput}
                value={data.coursePrice}
                name="coursePrice"
                type="text"
                placeholder="Course Price"
                className="input input-primary w-full"
              />
            </div>
            <div>
              <label htmlFor="">Author ID</label>
              <input
                onChange={handleInput}
                value={data.facultyId}
                name="facultyId"
                readOnly
                type="text"
                placeholder="Author ID"
                className="input input-primary w-full"
              />
            </div>
            <div>
              <label htmlFor="">Course PDF</label>
              <input
                onChange={handleInput}
                name="coursePdf"
                type="file"
                className="file-input file-input-primary w-full"
              />
            </div>
          </div>
          <div className="flex justify-center p-4">
            <button className="bg-green-500 py-2 px-20 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddCourse;