import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCoure, deleteCourse, deleteCourseById, getAllCourse, getAllCourseAdmin, getAllCourses, getCourseById, getCourseDetail, updateCourseById } from "./Api";

export const createCourseThunk = createAsyncThunk('create', async(data) => {
    try {
        const response = await addCoure(data)
        return response
    } catch (error) {
        throw new Error(error);
    }
})

export const getAllCourseThunk = createAsyncThunk('getAllCourse', async(data) => {
    try {
        const response = await getAllCourse(data)
        return response
    } catch (error) {
        throw new Error(error);
    }
})

export const deleteCourseThunk = createAsyncThunk('deleteCourse', async(data) => {
    try {
        const response = await deleteCourse(data)
        return response
    } catch (error) {
        throw new Error(error);
    }
})

// Get all courses
export const allCourseThunk = createAsyncThunk('allCourse', async(id) => {
    try{
        const result = await getAllCourseAdmin(id)
        return result;
    }catch(error){
        throw new Error(error);
    }
})

// Get all courses
export const allCoursesThunk = createAsyncThunk('allCourses', async() => {
    try{
        const result = await getAllCourses()
        return result;
    }catch(error){
        throw new Error(error);
    }
})

// Get Course By ID
export const getCourseByIdThunk = createAsyncThunk('getCourseById', async(id) => {
    try{
        const result = await getCourseById(id)
        return result;
    }catch(error){
        throw new Error(error);
    }
})

// Update Course by faculty
export const updateCourseThunk = createAsyncThunk('updateCourse', async(formData) => {
    try{
        const result = await updateCourseById(formData)
        return result;
    }catch(error){
        throw new Error(error);
    }
})

// Delete Course by ID
export const deleteCourseByIdThunk = createAsyncThunk('deleteCourse', async(id) => {
    try{
        const result = await deleteCourseById(id)
        return result;
    }catch(error){
        throw new Error(error);
    }
})


// Get Course Details
export const getCourseDetailThunk = createAsyncThunk('getCourseDetail', async(id) => {
    try{
        const result = await getCourseDetail(id)
        return result;
    }catch(error){
        throw new Error(error);
    }
})


const courseSlice = createSlice({
    name: 'course',
    initialState: {
        loading: false,
        courseData: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        // Create course thunk
        builder.addCase(createCourseThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createCourseThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.courseData = action.payload;
        })
        builder.addCase(createCourseThunk.rejected, (state) => {
            state.loading = false;
        })

        // Get All Course by Faculty
        builder.addCase(getAllCourseThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllCourseThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.courseData = action.payload;
        })
        builder.addCase(getAllCourseThunk.rejected, (state) => {
            state.loading = false;
        })

        // Delete course by id
        builder.addCase(deleteCourseThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteCourseThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.courseData = action.payload;
        })
        builder.addCase(deleteCourseThunk.rejected, (state) => {
            state.loading = false;
        })

        // Get all courses
        builder.addCase(allCourseThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(allCourseThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.courseData = action.payload;
        })
        builder.addCase(allCourseThunk.rejected, (state) => {
            state.loading = false;
        })

        //Get All Courses
        builder.addCase(allCoursesThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(allCoursesThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.courseData = action.payload;
        })
        builder.addCase(allCoursesThunk.rejected, (state) => {
            state.loading = false;
        })

        // Get Course By ID
        builder.addCase(getCourseByIdThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getCourseByIdThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.courseData = action.payload;
        })
        builder.addCase(getCourseByIdThunk.rejected, (state) => {
            state.loading = false;
        })

        // Update Course by faculty
        builder.addCase(updateCourseThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateCourseThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.courseData = action.payload;
        })
        builder.addCase(updateCourseThunk.rejected, (state) => {
            state.loading = false;
        })
    }
})

export default courseSlice.reducer;