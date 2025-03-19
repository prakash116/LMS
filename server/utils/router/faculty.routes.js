import express from 'express';
import { createFaculty, deleteCourse, facultyMulter, getCokkie, getCourse, getFacultyById, loginFaculty, refreshToken, resetPassword, updateFacultyById } from '../controllers/faculty.controller.js';
import protectRoute from '../middleware/protect_route/protect.route.js';
import { sendMail } from '../middleware/EmailVarification/sendMail.js';
const facultyRouter = express.Router();


facultyRouter.post('/admin/:adminid/create-faculty', facultyMulter, sendMail, createFaculty);
facultyRouter.get('/get-faculty-by-id/:fid', getFacultyById)
facultyRouter.post('/faculty-login', loginFaculty);
facultyRouter.get('/refresh-token', refreshToken);
facultyRouter.put('/update-faculty/admin/:adminid/:fid', facultyMulter, updateFacultyById);
facultyRouter.get('/get-course/faculty/:fid', getCourse)
facultyRouter.delete('/delete-course/faculty/:fid/:cid', deleteCourse)
facultyRouter.post('/reset-password/admin/:adminId/:fid',protectRoute, resetPassword)
facultyRouter.get('/cookie', getCokkie);


export default facultyRouter;




