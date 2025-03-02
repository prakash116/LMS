import axios from "axios";

// Create student
export const createStudent = async (data) => {
  const adminid = data.get("adminId");
  const url = `http://localhost:8585/api/v1/create-student/admin/${adminid}`;
  try {
    const response = await axios.post(url, data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

// Get student By id
export const getStudentById = async (studentId) => {
  const url = `http://localhost:8585/api/v1/get-student-by-id/${studentId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// Get All Students
export const getAllStudent = async (aId) => {
  const url = `http://localhost:8585/api/v1/get-all-student/admin/${aId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};


// Delete Student By Id
export const deleteStudent = async (sid) => {
    const url = `http://localhost:8585/api/v1/delete-student/${sid}`;
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };