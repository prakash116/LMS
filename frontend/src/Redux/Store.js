import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./Admin/AdminSlice";
import facultySlice from "./Faculty/FacultySlice";
import studentSlice from "./Student/StudentSlice";
import loginSlice from "./Auth/LoginSlice";
import courseSlice from "./Course/CourseSlice";

const store = configureStore({
    reducer: {
        adminSlice: adminSlice,
        loginSlice: loginSlice,
        facultySlice: facultySlice,
        studentSlice: studentSlice,
        courseSlice: courseSlice
    }
})
export default store;