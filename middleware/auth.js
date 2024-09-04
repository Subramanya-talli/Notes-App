const { getUser } = require("../service/auth")

async function restrictedToLoginUser(req, res, next) {
    const userUid = req.cookies?.uid;

    if (!userUid) {
        return res.redirect("/signup");
    }
    const user = getUser(userUid);
    if(!user){ return res.redirect("/signup"); }

    req.user = user;
    next();

}

module.exports = {
    restrictedToLoginUser,
}