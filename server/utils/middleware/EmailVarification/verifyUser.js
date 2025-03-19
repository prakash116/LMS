import adminModel from "../../models/admin.model.js";
import facultyModel from "../../models/faculty.model.js";
import studentModel from "../../models/student.model.js";
import handleError from "../error_logs/handleError.js";
import { verificationToken } from "./sendMail.js";

export const verifyUser = async (req, res) => {
  const { email, token, userType } = req.params;

  const data = verificationToken[email];

  if (!data || data.token !== token || Date.now() > data.expire) {
    return res
      .status(400)
      .json({ message: "Invalid or expired verification link" });
  }

  try {
    let user;
    switch (userType) {
      case "admin":
        user = await adminModel.findOne({ adminEmail: email });
        if (!user) {
          return handleError(res, 400, "Admin not found");
        }
        break;

      case "faculty":
        user = await facultyModel.findOne({ facultyEmail: email });
        if (!user) {
          return handleError(res, 400, "Faculty not found");
        }
        break;

      case "student":
        user = await studentModel.findOne({ studentEmail: email });
        if (!user) {
          return handleError(res, 400, "Student not found");
        }
        break;
      default:
        return res.status(400).json({ message: "Invalid user type" });
    }

    if (user.varification) {
      return res.status(400).json({ message: "Email already verified" });
    }

    user.varification = true;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error verifying email", error: err });
  }
};
