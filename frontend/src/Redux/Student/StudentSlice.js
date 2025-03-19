import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createStudent, deleteStudent, getAllStudent, getStudentById } from "./API";

// Create a Student
export const createStudentThunk = createAsyncThunk("create", async (data) => {
  try {
    const result = await createStudent(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
});

// Get a student by id
export const getStudentThunk = createAsyncThunk("getStudent", async (data) => {
  try {
    const result = await getStudentById(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
});

// Get All faculty
export const getAllStudentThunk = createAsyncThunk(
  "getAllStudent",
  async (data) => {
    try {
      const result = await getAllStudent(data);
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }
);


// Student Delete Thunk
export const deleteStudentThunk = createAsyncThunk("deleteStudent", async(sid) => {
  try {
    const result = await deleteStudent(sid);
    return result;
  } catch (e) {
    throw new Error(e);
  }
})

const studentSlice = createSlice({
  name: "student",
  initialState: {
    loading: false,
    studentData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Create a student
    builder.addCase(createStudentThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createStudentThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.studentData = action.payload;
    });
    builder.addCase(createStudentThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get a student by id
    builder.addCase(getStudentThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStudentThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.studentData = action.payload;
    });
    builder.addCase(getStudentThunk.rejected, (state) => {
      state.loading = false;
    });

    // Get All faculty
    builder.addCase(getAllStudentThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllStudentThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.studentData = action.payload;
    });
    builder.addCase(getAllStudentThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default studentSlice.reducer;
