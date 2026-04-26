import { Router } from "express";
import { addFavorite, removeFavorite, getFavorites } from "../controllers/videoController";
import verifyToken from "../middlewares/authMiddleware";
import { get } from "mongoose";

const router = Router();

// THESE ROUTES REQUIRE TO BE LOGGED IN

// ROUTE: POST /api/video/favorites
router.post('/favorites', verifyToken, addFavorite);
// ROUTE: DELETE /api/video/favorites   
router.delete('/favorites', verifyToken, removeFavorite);
// ROUTE: GET /api/video/favorites
router.get('/favorites', verifyToken, getFavorites);

export default router;