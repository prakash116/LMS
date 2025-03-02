import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callLogin, createId, resetUser, sendOTP, verifyOTP } from "./API.js";

// Create username and Password
export const createIdThunk = createAsyncThunk("create", async (data) => {
  try {
    const result = await createId(data);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
});

// Call login
export const loginThunk = createAsyncThunk("login", async (data) => {
  try {
    const result = await callLogin(data);
    return {
      data: result.data,
      status: result.status,
      headers: Object.fromEntries(Object.entries(result.headers)),
    };
  } catch (error) {
    throw new Error(error);
  }
});

// Email OTP Verification
export const sendOtpThunk = createAsyncThunk("Send OTP", async (data) => {
  try {
    const result = await sendOTP(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
});

// Verify OTP
export const verifyOtpThunk = createAsyncThunk("verifyOTP", async (data) => {
  try {
    const result = await verifyOTP(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
});


// reset Username and Password
export const resetUserThunk = createAsyncThunk("reset", async (data) => {
    try {
      const result = await resetUser(data);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  });

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    loginData: [],
    user: JSON.parse(localStorage.getItem("login")) || null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("login", JSON.stringify(state.user));
    },
    logout: (state, action) => {
      localStorage.removeItem("login");
      state.user = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.loginData = action.payload;
      })
      .addCase(createIdThunk.rejected, (state, action) => {
        state.loading = false;
      });

    // Login
    builder.addCase(loginThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.loginData = action.payload;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
    });

    // OTP Verification
    builder.addCase(sendOtpThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendOtpThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.loginData = action.payload;
    });
    builder.addCase(sendOtpThunk.rejected, (state, action) => {
      state.loading = false;
    });

    // Verify OTP
    builder.addCase(verifyOtpThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyOtpThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.loginData = action.payload;
    });
    builder.addCase(verifyOtpThunk.rejected, (state, action) => {
      state.loading = false;
    });

    // Reset Password
    builder.addCase(resetUserThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.loginData = action.payload;
    });
    builder.addCase(resetUserThunk.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
