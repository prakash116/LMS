import axios from "axios";

// Create Admin
export const createAdmin = async (formData) => {
  const url = "http://localhost:8585/api/v1/create-admin";
  try {
    const response = await axios.post(url, formData);
    return response.data;
  } catch (error) {
    if (error.response.data.message === "Email already exists") {
      throw new Error("Email already exists");
    }
    throw new Error(error);
  }
};

// Get all Admin
export const getAllAdmins = async () => {
  const url = "http://localhost:8585/api/v1/get-all-admin";
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// Get Admin by ID
export const getAdminById = async (adminid) => {
  const url = `http://localhost:8585/api/v1/get-admin/${adminid}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
