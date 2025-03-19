import express from 'express';
import { createStudent, deleteStudentById, getStudentById, loginStudent, studentMulter, updateStudent } from '../controllers/student.controller.js';
import { sendMail } from '../middleware/EmailVarification/sendMail.js';


const studentRouter = express.Router();

studentRouter.post('/create-student/admin/:adminid', studentMulter, sendMail, createStudent);
studentRouter.get('/get-student-by-id/:studentid', getStudentById)
studentRouter.get("/login-student", loginStudent);
studentRouter.put('/update-student/admin/:adminid/:studentid', studentMulter, updateStudent);
studentRouter.delete('/delete-student/:sid', deleteStudentById)


export default studentRouter;