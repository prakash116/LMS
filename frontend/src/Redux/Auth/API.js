import axios from "axios";
import toast from "react-hot-toast";

export const createId = async (data) => {
  if (!data.get("id")) {
    return
  }

  const userid = data.get("id");
  const payload = {
    id: data.get("id"),
    email: data.get("email"),
    password: data.get("password"),
    username: data.get("username"),
  };

  try {
    const response = await axios.post(
      `http://localhost:8585/api/v1/create-login/${userid}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login
export const callLogin = async (data) => {
  const payload = {
    username: data.get("username"),
    password: data.get("password"),
  };
  const url = "http://localhost:8585/api/v1/login";
  try {
    const response = await axios.post(url, payload);
    return response;
  } catch (error) {
    if(error.response.data.message === "User not found"){
      toast.error("username or password is incorrect")
    }
    if(error.response.data.message === "Incorrect password"){
      toast.error("username or password is incorrect")
    }
    throw new Error(error);
  }
};

// Send OTP
export const sendOTP = async (data) => {
  const email = {
    email: data,
  };
  try {
    const response = await axios.post(
      `http://localhost:8585/api/v1/send-otp`,
      email
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message)
    throw error;
  }
};

// Verify OTP
export const verifyOTP = async (data) => {
  try {
    const response = await axios.post(`http://localhost:8585/api/v1/verify-otp`, data);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message)
    throw error;
  }
};


// Reset User
export const resetUser = async (data) => {
  try {
    const response = await axios.post(`http://localhost:8585/api/v1/reset-user`,data);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message)
    throw error;
  }
};