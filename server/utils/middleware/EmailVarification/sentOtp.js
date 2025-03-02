import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import 'dotenv/config';

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmailOtp = async(email) => {
    const otp = otpGenerator.generate(6, { 
        digits: true, 
        upperCaseAlphabets: false, 
        specialChars: false, 
        lowerCaseAlphabets: false 
      });

      const mailOptions = {
        from: "prakashmanig000@gmail.com",
        to: email,
        subject: "Email Verification OTP",
        html: `Your email verification is ${otp}`};

    try {
        await transport.sendMail(mailOptions);
        console.log(
            `Email sent to ${email} with OTP: ${otp}`
        );
        return otp;
    } catch (error) {
        console.error(error);
    }
}

export default sendEmailOtp;