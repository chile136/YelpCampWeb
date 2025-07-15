const User = require("../models/user");

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/register");
};

module.exports.createUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registerUser = await User.register(user, password);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome To Yelp Camp !!!");
            res.redirect("/campgrounds");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("register");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
};

module.exports.signIn = (req, res) => {
    console.log(req.body);
    req.flash("success", "Welcome back!");
    const redirectUrl = res.locals.returnTo || "/campgrounds";
    res.redirect(redirectUrl);
};

module.exports.signOut = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "Goodbye!");
        res.redirect("/campgrounds");
    });
};
