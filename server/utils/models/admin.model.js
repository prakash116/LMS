import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminName: String,
    adminEmail:{
        type: String,
        required: true,
        unique: true
    },
    adminNumber: String,
    adminProfile: String,
    varification:{
        type: Boolean,
        default: false,
    },
})

const adminModel = mongoose.model("adminData", adminSchema);

export default adminModel;