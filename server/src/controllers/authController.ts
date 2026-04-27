import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import User from "../models/User";
import { error } from "node:console";
import e from "express";

export const register = async (req: Request, res: Response) => {
    const { firstName, lastName, username, email, password, confirmPassword, captchaToken } = req.body;

    try {
        console.log('[ ✅ REGISTERING ]: Data received:', req.body);
        // VERIFY CAPTCHA TOKEN WITH GOOGLE API
        const params = new URLSearchParams();
        params.append('secret', process.env.RECAPTCHA_SECRET_KEY || '');
        params.append('response', captchaToken);
        // VERIFY CAPTCHA
        const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', params);
        const { success, "error-codes": errorCodes } = response.data;
        // CHECK IF CAPTCHA IS VALID
        if (!success) {
            console.log('[ ❌ INVALID CAPTCHA ] Error codes:', errorCodes);
            return res.status(400).json({ message: "[ ❌ CAPTCHA ERROR ]: Invalid captcha" });
        }

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

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET || 'secret_key_temporal',
            { expiresIn: '1d' }
        );

        // SEND JWT TOKEN IN RESPONSE TO CLIENT
        res.status(201).json({
            message: "[ ✅ SUCCESS ]: Usuario registrado",
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });


    } catch (error) {
        res.status(500).json({ message: `[ ❌ REGISTER ERROR ]: ${error}` });
    }
};

export const login = async (req: Request, res: Response) => {
    // EXTRACT USERNAME AND PASSWORD FROM BODY
    const { login, password } = req.body;

    try {
        console.log('[ ✅ LOGIN ]: Data received:', req.body);
        // LOOK FOR USERNAME OR EMAIL IN DB
        const user = await User.findOne({
            $or: [
                { username: login },
                { email: login }
            ]
        });
        // USER NOT FOUND
        if (!user) {
            console.log("[ ❌ LOGIN ]: Usuario o email no encontrado");
            return res.status(400).json({ message: "El usuario o email que ingresaste no existe" });
        }

        // VERIFY PASSWORD
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log("[ ❌ LOGIN ]: Contraseña incorrecta");
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // TOKEN GENERATION
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET || 'secretKey',
            { expiresIn: '1h' }
        );

        // SEND USERNAME IN RESPONSE TO CLIENT (FOR USE IN FRONTEND)
        res.status(200).json({
            message: "Login exitoso",
            token,
            username: user.username
        });
        console.log("[ ✅ LOGIN ]: Login exitoso");

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};

export const logout = (req: Request, res: Response) => {
    // TODO: IMPLEMENT LOGOUT FUNCTIONALITY
};

export const recoverPassword = async (req: Request, res: Response) => {
    const { login, newPassword } = req.body;

    try {
        // CHECK IF USER EXISTS
        const user = await User.findOne({ $or: [{ username: login }, { email: login }] });
        if (!user) {
            console.log(`[ ❌ RECOVERY ERROR ]: Usuario no encontrado: ${login}`);
            return res.status(404).json({ message: "No existe un usuario con ese correo o username" });
        }
        // ENCRYPT NEW PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // SEARCH FOR USERNAME OR EMAIL AND UPDATE PASSWORD
        const updatedUser = await User.findOneAndUpdate(
            { $or: [{ username: login }, { email: login }] },
            { $set: { password: hashedPassword } },
            // RETURN UPDATED USER
            { new: true }
        );
        console.log(`[ 🔑 RECOVERY ]: Password updated for ${updatedUser?.username}`);
        // SEND RESPONSE
        res.status(200).json({
            message: "[ ✅ SUCCESS ]: Contraseña actualizada correctamente"
        });

    } catch (error) {
        console.error("[ ❌ RECOVERY CRASH ]:", error);
        res.status(500).json({ message: "Error al recuperar la contraseña" });
    }
};