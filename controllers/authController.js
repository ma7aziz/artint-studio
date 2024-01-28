const User = require('../schemas/userSchema');
const bcrypt = require('bcrypt');
const passport = require('passport');


exports.PostRegisterUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password less than 6 characters" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await new User({ name, email, password: hashedPassword }).save();
        res.status(200).json({
            message: "User successfully created",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user", error });
    }
};

exports.PostLoginUser = (passport.authenticate('local', {
            successRedirect: '/admin/dashboard',
            failureRedirect: '/admin',
            failureFlash: true
        }));
    


exports.LogoutUser = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}