import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
    {
        facultyName: String,
        facultyProfession: String,
        facultyEmail: {
            type: String,
            required: true,
            unique: true,
        },
        facultyMobile: String,
        facultyCity: String,
        facultyProfile: String,
        adminId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "adminData",
            required: true,
        },
        varification:{
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

const facultyModel = mongoose.model("facultyData", facultySchema);

export default facultyModel;
