import { Response } from 'express';
import User from '../models/User';

export const fetchFavorites = async (req: any, res: Response) => {
    try {
        // SEARCH USER
        const user = await User.findById(req.user.id);
        // USER NOT FOUND
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        // SEND RESPONSE
        res.status(200).json(user?.favorites || []);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener favoritos" });
    }
};

export const addFavorite = async (req: any, res: Response) => {
    try {
        // SEARCH USER
        const user = await User.findById(req.user.id);
        // USER NOT FOUND
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        // GET VIDEO DATA
        const video = req.body;
        // NORMALIZE VIDEO ID TO COMPARE
        const currentVideoId = video.id?.videoId || video.id || video.videoId;
        // CHECK IF VIDEO IS ALREADY IN FAVORITES
        const isDuplicate = user.favorites.some((fav: any) => {
            // NORMALIZE VIDEO ID
            const favId = fav.id?.videoId || fav.id || fav.videoId;
            // COMPARE
            return favId === currentVideoId;
        });
        // VIDEO ALREADY IN FAVORITES
        if (isDuplicate) {
            return res.status(400).json({ message: "Este video ya está en tus favoritos" });
        }

        // ADD VIDEO TO FAVORITES
        user.favorites.push(video);
        // SAVE USER DOCUMENT WITH NEW FAVORITES
        await user.save();
        // SEND RESPONSE
        res.status(201).json({ message: "Video añadido a favoritos" });
    } catch (error) {
        console.error("Error en addFavorite:", error);
        res.status(500).json({ message: "Error interno al guardar favorito" });
    }
};


export const removeFavorite = async (req: any, res: Response) => {
    try {
        // GET VIDEO ID
        const { id } = req.params;
        console.log(`[ 🗑️ REMOVING ]: Intentando eliminar video con ID: ${id}`);
        // SEARCH USER AND REMOVE VIDEO
        const user = await User.findByIdAndUpdate(
            // USER ID
            req.user.id,
            {
                $pull: {
                    favorites: {
                        // COMPARISON WITH VIDEO ID
                        $or: [
                            { "id.videoId": id },
                            { "id": id },
                            { "videoId": id },
                            { "_id": id }
                        ]
                    }
                }
            },
            // RETURN UPDATED USER
            { new: true }
        );
        // USER NOT FOUND
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        // SEND RESPONSE
        res.status(200).json({ message: "Eliminado con éxito" });
        console.log("[ ✅ SUCCESS ]: Video eliminado de la DB");
    } catch (error) {
        console.error("[ ❌ ERROR REMOVING ]:", error);
        res.status(500).json({ message: "Error al eliminar" });
    }
};