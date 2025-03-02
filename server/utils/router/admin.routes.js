import express from 'express';
import { adminMulter, createAdmin, deleteAllCourse, deleteAllFaculty, deleteAllStudent, deleteFacultyIdAdminAndFid, deleteStudentByIdandAdminId, findFacultyId, getAdminById, getAllAdmin, getAllCourse, getAllFaculty, getAllStudent, loginAdmin, updateAdminById } from '../controllers/admin.controller.js';
import { verifyUser } from '../middleware/EmailVarification/verifyUser.js';
import { sendMail } from '../middleware/EmailVarification/sendMail.js';
const adminRouter = express.Router();

adminRouter.post("/create-admin", adminMulter, sendMail, createAdmin)
adminRouter.get("/get-all-admin", getAllAdmin)
adminRouter.get("/get-admin/:adminid", getAdminById)
adminRouter.get("/verifyUser/:email/:token/:userType", verifyUser);
adminRouter.get('/login-admin', loginAdmin);
adminRouter.put('/update-admin/:adminid', adminMulter, updateAdminById)
adminRouter.get('/get-faculty/admin:adminid/:fid', findFacultyId)
adminRouter.get('/get-all-feculty/admin/:adminid', getAllFaculty)
adminRouter.delete('/delete-faculty-byid/admin/:adminid/:fid', deleteFacultyIdAdminAndFid);
adminRouter.delete('/delete-all-feculty/admin/:adminid', deleteAllFaculty)
adminRouter.delete('/delete-all-courses/admin/:adminid', deleteAllCourse);
adminRouter.get('/get-all-courses/admin/:adminid', getAllCourse);
adminRouter.get('/get-all-student/admin/:adminid', getAllStudent);
adminRouter.delete('/delete-student/admin/:adminid/:studentid', deleteStudentByIdandAdminId);
adminRouter.delete('/delete-all-student/admin/:adminid', deleteAllStudent)


export default adminRouter;