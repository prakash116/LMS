import bcrypt from "bcrypt";
import mongoose from "mongoose";
import facultyModel from "../models/faculty.model.js";
import multer from "multer";
import handleError from "../middleware/error_logs/handleError.js";
import adminModel from "../models/admin.model.js";
import path from "path";
import courseModel from "../models/course.model.js";
import jwt from "jsonwebtoken";

const monitorDoc = async(decId) => {
  setTimeout( async() => {
    const doc = await facultyModel.findById(decId)
    if(doc && !doc.varification){
      await facultyModel.findByIdAndDelete(decId)
      console.log(`Faculty email ${doc.facultyEmail} deleted due to inactivity`)
    }else{
      console.log(`Faculty email ${doc.facultyEmail} is active`)
    }
  }, 60000)
}

const facultyPath = path.join("public/faculty/");
const store = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, facultyPath);
  },
  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});

export const facultyMulter = multer({ storage: store }).single(
  "facultyProfile"
);

//! POST API (Faculty register)
export const createFaculty = async (req, res) => {
  const { adminid } = req.params;
  const { facultyName, facultyProfession, facultyEmail, facultyMobile, facultyCity, adminId } = req.body;
  const facultyProfile = req.file;

  if (!facultyProfile) {
    return handleError(res, 400, "Faculty profile is required");
  }
  if (
    facultyName &&
    facultyProfession &&
    facultyEmail &&
    facultyMobile &&
    facultyCity &&
    adminId
  ) {
    try {
      const verifyAdminId = await adminModel.findById(adminid);
      if (!verifyAdminId) {
        return handleError(res, 404, "Invalid admin id");
      }
      if (verifyAdminId._id.toString() !== adminId.toString()) {
        return handleError(res, 403, "Admin id is not matching");
      }
      const checkEmail = await facultyModel.findOne({
        facultyEmail: facultyEmail,
      });
      if (checkEmail) {
        return handleError(res, 400, "Email already use");
      }

      const facultyUser = new facultyModel({
        facultyName: facultyName,
        facultyProfession: facultyProfession,
        facultyEmail: facultyEmail,
        facultyMobile: facultyMobile,
        facultyCity: facultyCity,
        adminId: adminId,
        facultyProfile: facultyProfile.filename,
      });

      const saveFaculty = await facultyUser.save();
      monitorDoc(saveFaculty._id)
      if (saveFaculty) {
        return handleError(
          res,
          201,
          "Faculty created successfully",
          saveFaculty
        );
      } else {
        return handleError(res, 400, "Faculty creation failed");
      }
    } catch (error) {
      console.error(error);
      return handleError(
        res,
        500,
        "Internal Server Error (Faculty Creation Error)",
        error
      );
    }
  } else {
    return handleError(res, 400, "All fields are required");
  }
};

// ! Login api faculty

function generateToken(userid){
  return jwt.sign({userid:userid}, "secret", {expiresIn: "10s"});
}
function generateRefreshToken(userid){
  return jwt.sign({userid:userid}, "secret", {expiresIn: "1m"});
}

export const refreshToken = (req, res) => {
  const {refreshToken} = req.cookies;
  if(!refreshToken){
    return handleError(res, 401, "No refresh token provided");
  }
  jwt.verify(refreshToken, "secret", (err, decode) => {
    if(err){
      return handleError(res, 403, "Invalid refresh token");
    }
    const newToken = decode.userid
    const newRefreshToken = generateToken(newToken);
    res.cookie("accessToken", newRefreshToken, {httpOnly:true, maxAge: 7 * 24 * 60 * 1000});
  })
   return handleError(res, 200, "Token refreshed successfully")
}

// Login Faculty
export const loginFaculty = async (req, res) => {
  const { facultyEmail, facultyPassword } = req.body;
  if (facultyEmail && facultyPassword) {
    try {
      const checkEmail = await facultyModel.findOne({
        facultyEmail: facultyEmail,
      });
      if (!checkEmail) {
        return handleError(res, 404, "Invaild Email or password");
      }
      const isMatch = await bcrypt.compare(facultyPassword,checkEmail.facultyPassword);
      if (isMatch) {
        if(checkEmail){
          const userid = checkEmail._id;
          const accessToken = generateToken(userid);
          const refreshToken = generateRefreshToken(userid);
          res.cookie("accessToken", accessToken, {httpOnly:true, maxAge: 7 * 24 * 60 * 1000});
          res.cookie("refreshToken", refreshToken, {httpOnly:true, maxAge: 7 * 24 * 60 * 1000});
          return handleError(res, 200, "Faculty login successful", checkEmail, accessToken);
        }else{
          return handleError(res, 400, "Check mail not found", );
        }
      }else{
        return handleError(res, 401, "Invalid Email or password not logged in");
      }
    } catch (error) {
      return handleError(res, 500, "Internal Server Error (Faculty Login Error)",error)}
  } else {
    return handleError(res, 400, "Email and Password are required");
  }
};


// Faculty Reset Password
export const resetPassword = async(req, res) => {
  const {adminId, fid} = req.params
  const {oldPassword, newPassword, facultyId } = req.body;
  if (!adminId || !mongoose.Types.ObjectId.isValid(adminId)) {
    return handleError(res, 400, "Invalid or missing Admin ID");
  }
  if (!fid ||!mongoose.Types.ObjectId.isValid(fid)) {
    return handleError(res, 400, "Invalid or missing Faculty ID");
  }
  if(oldPassword && newPassword && facultyId) {
    try {
      const verifyAdminId = await adminModel.findById(adminId)
      if (!verifyAdminId) {
        return handleError(res, 404, "Invalid admin id");
      }
      const verifyFacultyId = await facultyModel.findById(fid)
      if (!verifyFacultyId) {
        return handleError(res, 404, "Invalid faculty id");
      }
      if (verifyFacultyId._id.toString()!== facultyId.toString()) {
        return handleError(res, 403, "Faculty id is not matching");
      }
      const verifyFacultyPassword = await bcrypt.compare(oldPassword, verifyFacultyId.facultyPassword);
      if (!verifyFacultyPassword) {
        return handleError(res, 401, "Invalid old password");
      }
      if (newPassword === oldPassword) {
        return handleError(res, 400, "New password should not be same as old password");
      }
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(newPassword, salt);                                                                                                                     
      verifyFacultyId.facultyPassword = hashPass;
      const updatedFaculty = await verifyFacultyId.save();
      if (updatedFaculty) {
        return handleError(res, 200, "Password updated successfully", updatedFaculty);
      } else {
        return handleError(res, 400, "Password update failed");
      }
    }catch (err){
      return handleError(res, 500, "Internal Server Error (Faculty Reset Password Error)", err);
    }
  }else{
    return handleError(res, 400, "Old Password and New Password are required");
  }
}

//Get FAculty by id

export const getFacultyById = async(req, res) => {
  const { fid } = req.params;
  if (!fid ||!mongoose.Types.ObjectId.isValid(fid)) {
    return handleError(res, 400, "Invalid or missing Faculty ID");
  }
  try {
    const faculty = await facultyModel.findById(fid);
    if (!faculty) {
      return handleError(res, 404, "Faculty not found");
    }
    return handleError(res, 200, "Faculty found successfully", faculty);
  } catch (error) {
    return handleError(res, 500, "Internal Server Error (Faculty Find Error)", error);
  }
}

// Update faculty by admin id and fid
export const updateFacultyById = async (req, res) => {
  const { adminid, fid } = req.params;

  if (!adminid || !mongoose.Types.ObjectId.isValid(adminid)) {
    return handleError(res, 400, "Invalid or missing Admin ID");
  }
  if (!fid || !mongoose.Types.ObjectId.isValid(fid)) {
    return handleError(res, 400, "Invalid or missing Faculty ID");
  }
  const { facultyName, facultyEmail, facultyMobile, facultyPassword, adminId } =
    req.body;
  const facultyProfile = req.file;
  try {
    const admin = await adminModel.findById(adminid);
    if (!admin) {
      return handleError(res, 404, "Admin not found");
    }
    const faculty = await facultyModel.findById(fid);
    if (!faculty) {
      return handleError(res, 404, "Faculty not found");
    }
    const checkId = admin._id.toString() !== adminId.toString();
    if (checkId) {
      return handleError(res, 403, "Unauthorized access");
    }
    const updateData = {
      facultyName,
      facultyEmail,
      facultyMobile,
      facultyPassword,
      adminId,
    };
    if (facultyPassword) {
      const salt = await bcrypt.genSalt(10);
      updateData.facultyPassword = await bcrypt.hash(facultyPassword, salt);
    }
    if (facultyProfile) {
      updateData.facultyProfile = facultyProfile.filename;
    }
    const updateFaculty = await facultyModel.findByIdAndUpdate(
      fid,
      updateData,
      { new: true }
    );
    if (!updateFaculty) {
      return handleError(res, 400, "Faculty update failed");
    } else {
      return handleError(
        res,
        200,
        "Faculty updated successfully",
        updateFaculty
      );
    }
  } catch (error) {
    return handleError(res, 400, "Internal Server Error", error);
  }
};

// get courses by faculty
export const getCourse = async (req, res) => {
  const { fid } = req.params;
  if (!fid || !mongoose.Types.ObjectId.isValid(fid)) {
    return handleError(res, 400, "Invalid or missing Faculty ID");
  }
  try {
    const isValidFacultyId = await facultyModel.findById(fid);
    if (!isValidFacultyId) {
      return handleError(res, 404, "Faculty not found");
    }
    const facultyCourses = await courseModel
      .find({ facultyId: isValidFacultyId })
      .populate("facultyId");
    if (!facultyCourses) {
      return handleError(res, 404, "No courses found for this faculty");
    } else {
      return handleError(res, 200, "Faculty courses", facultyCourses);
    }
  } catch (error) {
    return handleError(res, 400, "Internal Server Error", error);
  }
};

// DELETE course by fid and cid
export const deleteCourse = async (req, res) => {
  const { fid, cid } = req.params;
  if (
    !fid ||
    !mongoose.Types.ObjectId.isValid(fid) ||
    !cid ||
    !mongoose.Types.ObjectId.isValid(cid)
  ) {
    return handleError(res, 400, "Invalid or missing Faculty ID or Course ID");
  }
  try {
    const isValidFid = await facultyModel.findById(fid);
    if (!isValidFid) {
      return handleError(res, 404, "Faculty not found");
    }
    const isValidCid = await courseModel.findById(cid);
    if (!isValidCid) {
      return handleError(res, 404, "Course not found");
    }
    const isValidFaculty =
      isValidFid._id.toString() === isValidCid.facultyId.toString();
    if (isValidFaculty) {
      const deleteCourse = await courseModel.findByIdAndDelete(cid);
      if (!deleteCourse) {
        return handleError(res, 404, "Course not found to delete");
      } else {
        return handleError(
          res,
          200,
          "Course deleted successfully",
          deleteCourse
        );
      }
    } else {
      return handleError(res, 403, "Unauthorized access to delete this course");
    }
  } catch (error) {
    return handleError(res, 500, "Internal Error", error);
  }
};


export const getCokkie = (req, res) => {
  res.cookie("token", "123", {httpOnly:true, maxAge:2*24*60*60});
  res.send("Cookie created");
}