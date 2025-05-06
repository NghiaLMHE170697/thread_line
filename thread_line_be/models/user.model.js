const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    avatar:{
        type: String,
        default: "https://via.placeholder.com/150",
    },
    isActive:{
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const User = mongoose.model("user", userSchema);

module.exports = User;