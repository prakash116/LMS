import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFaculty, deleteFaculty, getAllFaculty, getFaculty, getFacultyById } from "./API";

// Create a Faculty
export const createFacultyThunk = createAsyncThunk("create", async(data) => {
    try{
        const result = await createFaculty(data)
        return result;
    } catch(e){
        throw new Error(e);
    }
})

// Get faculty by id
export const getFacultyThunk = createAsyncThunk("getFaculty", async(data) => {
    try{
        const result = await getFacultyById(data)
        return result;
    } catch(e){
        throw new Error(e);
    }
})

// Get All faculty
export const getAllFacultyThunk = createAsyncThunk("getAllFaculty", async(data) => {
    try{
        const result = await getAllFaculty(data)
        return result;
    } catch(e){
        throw new Error(e);
    }
})

// Delete faculty
export const deleteFacultyThunk = createAsyncThunk('deleteFaculty', async(data) => {
    try {
        const response = await deleteFaculty(data)
        return response.data
    } catch (error) {
        throw new Error(error);
    }
})

// Get Faculty Details
export const getFaucultyThunk = createAsyncThunk('getFauculty', async(fid) => {
    try {
        const response = await getFaculty(fid)
        return response
    } catch (error) {
        throw new Error(error);
    }
})
const facultySlice = createSlice({
    name: "faculty",
    initialState: {
        loading: false,
        facultyData: [],
    },
    reducers: {},
    extraReducers: (builder) => {

        // 1 Create faculty thunk
        builder.addCase(createFacultyThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createFacultyThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.facultyData = action.payload;
        })
        builder.addCase(createFacultyThunk.rejected, (state) => {
            state.loading = false;
        })

        // Get faculty by id thunk
        builder.addCase(getFacultyThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getFacultyThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.facultyData = action.payload;
        })
        builder.addCase(getFacultyThunk.rejected, (state) => {
            state.loading = false;
        })


        // Get All faculty
        builder.addCase(getAllFacultyThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllFacultyThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.facultyData = action.payload;
        })
        builder.addCase(getAllFacultyThunk.rejected, (state) => {
            state.loading = false;
        })

        // Delete faculty
        builder.addCase(deleteFacultyThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteFacultyThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.facultyData = action.payload;
        })
        builder.addCase(deleteFacultyThunk.rejected, (state) => {
            state.loading = false;
        })

    },
})

export default facultySlice.reducer