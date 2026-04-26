import { Request, Response } from "express";
import User from "../models/User";

export const addFavorite = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user.id);
        const videoId = req.body;

        if (!user) {
            return res.status(404).json({ message: "[ ❌ USER ERROR ]: User not found" });
        }

        if (!videoId) {
            return res.status(400).json({ message: "[ ❌ ADD VIDEO ERROR ]: Video ID is required" });
        }

        // CHECK IF VIDEO ID IS ALREADY IN FAVORITES
        if (user.favorites.includes(videoId)) {
            return res.status(400).json({ message: "[ ❌ ADD VIDEO ERROR ]: Video is already in favorites" });
        }

        // ADD VIDEO ID TO FAVORITES
        user.favorites.push(videoId);
        // SAVE THE UPDATED USER DOCUMENT
        await user.save();

        // RESPOND WITH SUCCESS MESSAGE
        res.status(200).json({ message: "[ ✅ SUCCESS ]: Video added to favorites" });
    } catch (error) {
        res.status(500).json({ message: `[ ❌ ADD FAVORITE ERROR ]: ${error}` });
    }
};

export const removeFavorite = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user.id);
        const videoId = req.body;

        if (!user) {
            return res.status(404).json({ message: "[ ❌ USER ERROR ]: Null user" });
        }

        if (!videoId) {
            return res.status(400).json({ message: "[ ❌ REMOVE VIDEO ERROR ]: Null video id" });
        }

        // CHECK IF VIDEO ID IS IN FAVORITES
        if (!user.favorites.includes(videoId)) {
            return res.status(400).json({ message: "[ ❌ REMOVE VIDEO ERROR ]: Video is not in favorites" });
        }

        // FILTER ALL VIDEO IDS EXCEPT THE ONE TO BE REMOVED
        user.favorites = user.favorites.filter((id: string) => id !== videoId);
        // SAVE THE UPDATED USER DOCUMENT
        await user.save();

        // RESPOND WITH SUCCESS MESSAGE
        res.status(200).json({ message: "[ ✅ SUCCESS ]: Video removed from favorites" });
    } catch (error) {
        res.status(500).json({ message: `[ ❌ REMOVE VIDEO ERROR ]: ${error}` });
    }
};

export const getFavorites = async (req: any, res: Response) => {

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "[ ❌ GET FAVORITES ERROR ]: Null user" });
        }

        // RETURN THE FAVORITES ARRAY OR AN EMPTY ARRAY IF USER NOT FOUND
        res.status(200).json(user?.favorites || []);
    } catch (error) {
        res.status(500).json({ message: `[ ❌ GET FAVORITES ERROR ]: ${error}` });
    }
};