const mongoose = require("mongoose");
const { isEmail } = require("validator")

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please enter a name"],
        },
        email:{
            type: String,
            required: [true, "Please enter an email"],
            unique: true,
            lowercase: true,
            validate:[isEmail, "Please enter a valid email"]
        },
        password:{
            type: String,
            required: [true, "Please enter an password"],
            minlength: [6,"Minimum password length is 6 charcters"]
        }
    }, 
    { 
        timestamps: true 
    }
);

const User = mongoose.model("user", userSchema);

module.exports = User;

