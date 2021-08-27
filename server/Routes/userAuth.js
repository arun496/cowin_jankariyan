const express = require("express");
const router = express.Router();

// Get user schema model
const User = require("../Model/userSchema.js");

router.post("/signup/:email/:password/:username/:pincode", async (req, res) => {
    const { username, email, password, pincode } = req.params;
    console.log(username, email, password, pincode, req.params);

    try {
        let userResponse = await User.findOne({
            email: email
        })
        console.log(userResponse, email);
        // // If user exists
        if (userResponse) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }
        // // If new user (doesn't exists)
        let newUser = new User({
            username: username,
            email: email,
            password: password,
            pincode: pincode,
        })
        console.log('Created..', newUser);
        await newUser.save()
        return res.json({ user: newUser, msg: "User sign up successful!!" });
    } catch (e) {
        console.log(e);
        return res.status(500).send("Error in User Sign Up..");
    }
})

router.post("/login/:email/:password", async (req, res) => {
    const { email, password } = req.params;
    console.log(email, password);
    try {
        let user = await User.findOne({
            email: email
        })

        console.log(user);
        // // If user doesn't exists
        if (user === null) {
            return res.json({
                msg: "User doesn't exists.."
            });
        }

        // Check for valid credentials
        if (email !== user.email || password !== user.password) {
            return res.status(400).json({
                msg: "Wrong User Credentials.."
            });
        }

        return res.json({ user: user, msg: "User Log in Successful!!" })
    } catch (e) {
        return res.status(500).json({ msg: "Error in User Log in.." });
    }
})

module.exports = router;