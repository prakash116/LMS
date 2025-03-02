import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAdmin, getAdminById, getAllAdmins } from "./API.js";

export const createAdminThunk = createAsyncThunk("create", async (formData) => {
  try {
    const result = await createAdmin(formData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
});

// Get All admins
export const getAllAdminThunk = createAsyncThunk("getAllAdmin", async () => {
  try {
    const result = await getAllAdmins();
    return result;
  } catch (error) {
    throw new Error(error);
  }
});

// Get Admin by id
export const getAdminThunk = createAsyncThunk("getAdmin", async (id) => {
  try {
    const result = await getAdminById(id);
    return {
      data: result.data,
      status: result.status,
      headers: Object.fromEntries(Object.entries(result.headers)),
    };
  } catch (error) {
    throw new Error(error);
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    adminData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // create admin thunk
    builder.addCase(createAdminThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAdminThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.adminData = action.payload;
    });
    builder.addCase(createAdminThunk.rejected, (state) => {
      state.loading = false;
    });

    // get all admin thunk
    builder.addCase(getAllAdminThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAdminThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.adminData = action.payload;
    });
    builder.addCase(getAllAdminThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get admin by id
    builder.addCase(getAdminThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.adminData = action.payload;
    });
    builder.addCase(getAdminThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default adminSlice.reducer;
