import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studentName: String,
    studentEmail: {
        type: String,
        required: true,
        unique: true,
    },
    studentMobile: String,
    studentCourse: String,
    studentProfile: String,
    studentGender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "adminData",
        required: true,
    },
    varification:{
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
})

const studentModel = mongoose.model("studentData", studentSchema);

export default studentModel;