const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const user = require("../controllers/users");
const { storeReturnTo } = require("../middleware");

router
    .route("/register")
    .get(user.renderSignUpForm)
    .post(catchAsync(user.createUser));

router
    .route("/login")
    .get(user.renderLoginForm)
    .post(
        storeReturnTo,
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login",
        }),
        user.signIn
    );

router.route("/logout").get(user.signOut);

module.exports = router;
