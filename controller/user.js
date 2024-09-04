const User = require("../model/user")
const {setUser} = require("../service/auth")
const jwt = require('jsonwebtoken');
 

    // Handle Errors
async function handleErrors(err)
{
    console.log(err.message, err.code)
    const errors = { name: '', email: '', password: '' };

    // Duplicate Error Code
    if(err.code === 11000)
    {
        errors.email = "this email is already registered";
        return errors;
    }

    // Validation Errors
    if(err.message.includes('user validation failed'))
    {
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}


async function handleUserSignup(req, res)
{
    const { name, email, password} = req.body;   
    try {
        const user = await User.create({ name, email, password});
        res.render("login")
    } catch (err) {
        res.status(400).json(err);
    }
}

async function handleUserlogin(req, res)
{
    const { email, password } = req.body;
    const user = await User.findOne({email, password});
    if(!user)
    {
        return res.render("login", { error: "Invalid Username or Password"})
    }

    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect('/users');
}



module.exports = {
    handleUserSignup,
    handleUserlogin
}