import { model, Schema } from "mongoose";


const loginSchema = new Schema({
    email: String,
    username: String,
    password: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    role:String,
})

const loginModel = model("login", loginSchema)

export default loginModel