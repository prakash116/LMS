import express from "express";
import { courseMulter, createCourse, deleteCourse, getAllCourses, getCourse, getCourseByID, updateCourse } from "../controllers/course.controller.js";

const courseRouter = express.Router();

courseRouter.post('/create-course/:fid', courseMulter, createCourse)
courseRouter.put('/update-course/faculty/:fid/:cid', courseMulter, updateCourse)
courseRouter.get('/get-all-course', getAllCourses)
courseRouter.get('/get-course/faculty/:fid/:cid' , getCourse)
courseRouter.delete('/delete-course/:id', deleteCourse);
courseRouter.get('/get-course/:id', getCourseByID)
export default courseRouter;