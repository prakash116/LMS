import axios from "axios";
import toast from "react-hot-toast";

// Add Couser API
export const addCoure = async (data) => {
  const fid = data.get("facultyId");
  const url = `http://localhost:8585/api/v1/create-course/${fid}`;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    if (error.response.data.message === "Course PDF is required") {
      toast.error("All fields are required");
    }
    if (error.response.data.message === "All fields must be required") {
      toast.error("All fields are required");
    }
    throw new Error(error);
  }
};

// Get All Course API
export const getAllCourse = async (fid) => {
  const url = `http://localhost:8585/api/v1/get-course/faculty/${fid}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// Delete Course by Faculty
export const deleteCourse = async (data) => {
  const { fid, cid } = data;
  const url = `http://localhost:8585/api/v1/delete-course/faculty/${fid}/${cid}`;
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// Get All Course by Admin
export const getAllCourseAdmin = async (id) => {
  const url = `http://localhost:8585/api/v1/get-all-courses/admin/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// Get All Course
export const getAllCourses = async () => {
  const url = `http://localhost:8585/api/v1/get-all-course`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// Get Course by ID
export const getCourseById = async (id) => {
  const { fid, cid } = id;
  const url = `http://localhost:8585/api/v1//get-course/faculty/${fid}/${cid}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// Update Course
export const updateCourseById = async (formData) => {
  const fid = formData.get("fid");
  const cid = formData.get("cid");
  const url = `http://localhost:8585/api/v1/update-course/faculty/${fid}/${cid}`;
  try {
    const response = await axios.put(url, formData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// Delete Course By ID
export const deleteCourseById = async (id) => {
  const url = `http://localhost:8585/api/v1/delete-course/${id}`;
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// Get Course Details
export const getCourseDetail = async (id) => {
  const url = `http://localhost:8585/api/v1/get-course/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

