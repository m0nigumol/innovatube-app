/* 
    THIS SCRIPT WILL VERIFY IF THE USER SENDED
    A VALID TOKEN IN THE AUTHORIZATION HEADER
*/

import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: any, res: Response, next: NextFunction) => {
    // GET THE TOKEN FROM THE HEADER
    const token = req.header('Authorization')?.split(' ')[1];

    // CHECK IF TOKEN IS NOT NULL
    if (!token) {
        return res.status(401).json({ message: "[ ❌ TOKEN ERROR ]: Access denied. No token provided." });
    }

    // VERIFY THE TOKEN
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).json({ message: "[ ❌ JWT ERROR ]: Invalid token." });
    }
};

export default verifyToken;