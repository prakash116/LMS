import mongoose from "mongoose";
import handleError from "../middleware/error_logs/handleError.js";
import courseModel from "../models/course.model.js";
import facultyModel from "../models/faculty.model.js";
import multer from "multer";
import path from "path";

const coursePath = path.join("public/course/");
const store = multer.diskStorage({
  destination: (req, file, cd) => {
    return cd(null, coursePath);
  },
  filename: (req, file, cd) => {
    return cd(null, file.originalname);
  },
});
export const courseMulter = multer({ storage: store }).single("coursePdf");

// ! Create a new Course
// ! POST API
export const createCourse = async (req, res) => {
  const { fid } = req.params;
  if (!fid || !mongoose.Types.ObjectId.isValid(fid)) {
    return handleError(res, 400, "Invalid or missing Faculty ID");
  }
  const couserPdf = req.file;
  if (!couserPdf) {
    return handleError(res, 400, "Course PDF is required");
  }
  const { courseTitle, courseContent, courseAuthor, facultyId } = req.body;
  if (courseTitle && courseContent && courseAuthor && facultyId) {
    try {
      const faculty = await facultyModel.findById(fid);
      if (!faculty) {
        return handleError(res, 404, "Faculty not found");
      }
      const checkId = faculty._id.toString() !== facultyId.toString();
      if (checkId) {
        return handleError(res, 403, "Unauthorized access");
      }

      const storeCourse = new courseModel({
        courseTitle: courseTitle,
        courseContent: courseContent,
        courseAuthor: courseAuthor,
        facultyId: facultyId,
        coursePdf: couserPdf.filename,
      });

      if (storeCourse) {
        await storeCourse.save();
        return handleError(
          res,
          200,
          "Course successfully created",
          storeCourse
        );
      } else {
        return handleError(res, 400, "Course creation failed");
      }
    } catch (error) {
      return handleError(res, 500, "server error", error);
    }
  } else {
    return handleError(res, 403, "All fields must be required");
  }
};

// Update Course by FID and CID
export const updateCourse = async (req, res) => {
  const { fid, cid } = req.params;
  if (!fid || !mongoose.Types.ObjectId.isValid(fid)) {
    return handleError(res, 400, "Invalid or missing Faculty ID");
  }
  if (!cid || !mongoose.Types.ObjectId.isValid(cid)) {
    return handleError(res, 400, "Invalid or missing Course ID");
  }
  const { courseTitle, courseContent, courseAuthor, facultyId } = req.body;
  const coursePdf = req.file;

  try {
    const isValidFacultyId = await facultyModel.findById(fid);
    if (!isValidFacultyId) {
      return handleError(res, 404, "Faculty not found");
    }

    const checkId = isValidFacultyId._id.toString() !== facultyId.toString();
    if (checkId) {
      return handleError(res, 403, "Unauthorized access");
    }

    const isValidCourseId = await courseModel.findById(cid);
    if (!isValidCourseId) {
      return handleError(res, 404, "Course not found");
    }
    const updateData = { courseTitle, courseContent, courseAuthor, facultyId };
    if (coursePdf) {
      updateData.coursePdf = coursePdf.filename;
    }

    const updatedCourse = await courseModel.findByIdAndUpdate(cid, updateData, {
      new: true,
    });
    if (!updatedCourse) {
      return handleError(res, 400, "Course update failed");
    } else {
      return handleError(
        res,
        200,
        "Course updated successfully",
        updatedCourse
      );
    }
  } catch (error) {
    return handleError(res, 400, "Internal Server Error", error);
  }
};

// Get All courses

export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find();
    if (!courses) {
      return handleError(res, 404, "No courses found");
    }
    return handleError(res, 200, "Courses retrieved successfully", courses);
  } catch (error) {
    return handleError(res, 500, "Server error", error);
  }
};

// Get Course by fid and cid

export const getCourse = async (req, res) => {
  const { fid, cid } = req.params;
  if (!fid || !mongoose.Types.ObjectId.isValid(fid)) {
    return res.status(400).json({ error: "Invalid or missing Faculty ID" });
  }
  if (!cid || !mongoose.Types.ObjectId.isValid(cid)) {
    return res.status(400).json({ error: "Invalid or missing Course ID" });
  }
  try {
    const facultyExists = await facultyModel.findById(fid);
    if (!facultyExists) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    const course = await courseModel.findOne({ _id: cid, facultyId: fid });
    if (!course) {
      return res.status(404).json({ error: "Course not found under this faculty" });
    }
    return res.status(200).json({ message: "Course retrieved successfully", course });
  } catch (error) {
    console.error("Error fetching course:", error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Delete Course 
export const deleteCourse = async(req, res) => {
  const { id } = req.params
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid or missing Faculty ID" });
  }
  try {
    const checkId = await courseModel.findByIdAndDelete({_id: id});
    if(checkId) {
      return res.status(200).json({ message: "Course Delete successfully", data:checkId });
    }else{
      return res.status(400).json({ message: "Course Delete Feild"});
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error});
  }
}


// Get Course by Id
export const getCourseByID = async(req, res) => {
  const { id } = req.params
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid or missing Faculty ID" });
  }
  try {
    const courseData = await courseModel.findById(id);
    if(courseData){
      return res.status(200).json({ message: "Course Data find successfully", data:courseData });
    }else{
      return res.status(200).json({ message: "Course Data find Feild "});
    }
  } catch (error) {
    return res.status(200).json({ message: "Internal Server Error(Get Course Data)", error });
  }
}