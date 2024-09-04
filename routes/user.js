const express = require("express")
const router = express.Router();
const { handleUserSignup, handleUserlogin } = require("../controller/user");

router.post('/signup', handleUserSignup);
router.post('/login', handleUserlogin);

router.get('/signup', async(req,res)=>{
    return res.render("signup");
})

router.get('/login', async(req,res)=>{
    return res.render("login");
})



module.exports = router;