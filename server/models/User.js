import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },

    password: {
        type: String,
        required: true,
        min: 2,
    },

    role: {
        type: String,
        default: "user"
    }
});

const User = mongoose.model("User", UserSchema);
export default User;