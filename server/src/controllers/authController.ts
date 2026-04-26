import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
    const { firstName, lastName, username, email, password, captchaToken } = req.body;

    try {
        // TODO: ACTIVATE CAPTCHA AFTER TESTING PHASE

        // CHECK IF USERNAME OR EMAIL ALREADY EXISTS IN DB
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "[ ❌ USER ERROR ]: Username or Email already exists" });
        }

        // ENCRYPT PASSWORD (BEFORE SAVING TO DB)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // CREATE NEW USER INSTANCE WITH ENCRYPTED PASSWORD AND NEW USER DATA
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        });

        // SAVE NEW USER INTO DB
        await newUser.save();
        res.status(201).json({ message: "[ ✅ SUCCESS ]: User has been registered successfully" });

    } catch (error) {
        res.status(500).json({ message: `[ ❌ REGISTER ERROR ]: ${error}` });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        // CHECK IF USERNAME OR EMAIL EXISTS IN DB
        const user = await User.findOne({ $or: [{ username }, { email: email }] });
        if (!user) {
            return res.status(400).json({ message: "[ ❌ USER ERROR ]: Invalid username or email" });
        }

        // COMPARE PROVIDED PASSWORD WITH HASHED PASSWORD IN DB
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "[ ❌ PASSWORD ERROR ]: Invalid password" });
        }

        // GENERATE JWT TOKEN
        const token = jwt.sign(
            // PAYLOAD WITH USER ID AND USERNAME
            { id: user._id, username: user.username },
            // SECRET KEY FOR SIGNING
            process.env.JWT_SECRET || 'secretKey',
            // EXPIRATION TIME FOR TOKEN
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: "[ ✅ SUCCESS ]: User logged in successfully",
            token,

        });

    } catch (error) {
        res.status(500).json({ message: `[ ❌ LOGIN ERROR ]: ${error}` });
    }
};

export const logout = (req: Request, res: Response) => {
    // TODO: IMPLEMENT LOGOUT FUNCTIONALITY
};

export const recoverPassword = (req: Request, res: Response) => {
    // TODO: IMPLEMENT PASSWORD RECOVERY FUNCTIONALITY
};