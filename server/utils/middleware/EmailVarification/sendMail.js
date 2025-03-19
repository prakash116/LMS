import crypto from "crypto";
import nodemailer from "nodemailer";
import adminModel from "../../models/admin.model.js";
import facultyModel from "../../models/faculty.model.js";
import studentModel from "../../models/student.model.js";
import 'dotenv/config';

const verificationToken = {};

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendMail = async (req, res, next) => {
  const { adminEmail, facultyEmail, studentEmail } = req.body;

  let email, userType;
  if (adminEmail) {
    email = adminEmail;
    userType = "admin";
  } else if (facultyEmail) {
    email = facultyEmail;
    userType = "faculty";
  } else if (studentEmail) {
    email = studentEmail;
    userType = "student";
  } else {
    return res.status(400).json({ message: "Email is required" });
  }

  const token = crypto.randomBytes(20).toString("hex");
  verificationToken[email] = { token, expire: Date.now() + 60 * 60 * 1000 };

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Email Verification",
    html: `Please click on this link to verify your email: <a href='http://localhost:8585/api/v1/verifyUser/${email}/${token}/${userType}'>Verify Email</a>`,
  };

  try {
  let checkEmail;
  switch(userType) {
    case "admin":
      checkEmail = await adminModel.findOne({ adminEmail });
      if (checkEmail) {
        if (checkEmail.varification) {
          return res.status(400).json({ message: "Email already exists" });
        } else {
          await adminModel.deleteOne({ adminEmail });
        }
      }
      break;
      case "faculty":
      checkEmail = await facultyModel.findOne({ facultyEmail });
      if (checkEmail) {
        if (checkEmail.varification) {
          return res.status(400).json({ message: "Email already exists" });
        } else {
          await facultyModel.deleteOne({ facultyEmail });
        }
      }
      break;

      case "student":
      checkEmail = await studentModel.findOne({ studentEmail });
      if (checkEmail) {
        if (checkEmail.varification) {
          return res.status(400).json({ message: "Email already exists" });
        } else {
          await studentModel.deleteOne({ studentEmail });
        }
      }
      break;
      default:
      return res.status(400).json({ message: "Invalid user type" });
   }

    await transport.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
    next();
  } catch (err) {
    res.status(500).json({ message: "Error sending email", error: err });
  }
};

export { verificationToken };
