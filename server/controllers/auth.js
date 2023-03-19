import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const { userName, password, role } = req.body;

        const isUserExist = await User.findOne({ userName: userName });
        if (!isUserExist) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                userName, password: hashedPassword, role
            });
            let savedUser = await newUser.save();

            const token = jwt.sign({ user: savedUser.userName }, process.env.JWT_SECRET, { expiresIn: "2h" });
            savedUser = savedUser.toObject();
            delete savedUser.password;
            res.status(201).json({ user: savedUser, token: token });
        }

        else {
            res.status(500).json({ msg: "User Already Exist" })
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        let user = await User.findOne({ userName: userName });
        if (!user) return res.status(400).json({ msg: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "invalid credential" });

        const token = jwt.sign({ user: user.userName }, process.env.JWT_SECRET, { expiresIn: "2h" });
        user = user.toObject();
        delete user.password;
        res.status(200).json({ token, user });


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}