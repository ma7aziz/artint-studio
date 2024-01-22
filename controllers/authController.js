const User = require('../schemas/userSchema');

exports.PostRegisterUser = async (req, res) => {
    console.log('called ///');
    console.log(req.body);

    const { username, email, password } = req.body;

    try {
        if (password.length < 6) {
            console.log('password less than 6 characters');
            return res.status(400).json({ message: "Password less than 6 characters" });
        }

        const user = await User.create({ username, email, password });

        res.status(200).json({
            message: "User successfully created",
            user,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};
