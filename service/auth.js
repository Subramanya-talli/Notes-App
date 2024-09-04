const jwt = require("jsonwebtoken");
const secretkey = "stalli$2468@"

function setUser(user)
{
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secretkey);
}

function getUser(token)
{
    if(!token){
        return null;
    }
     
    const user = jwt.verify(token, secretkey);

    return user;
}



module.exports = {
    setUser,
    getUser
}