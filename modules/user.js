import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: "customer"
    },
    profilePicture: {
        type: String,
        default: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1741108443~exp=1741112043~hmac=ba0ed2f100e253be25e845267e06d1b12a26c38e42fd805d5d420758443e3c0c&w=900"
    }

})

const User = mongoose.model("users", userSchema);

export default User;