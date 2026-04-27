import { Router } from "express";
import { addFavorite, removeFavorite, fetchFavorites } from "../controllers/favoriteController";
import verifyToken from "../middlewares/authMiddleware";
import { get } from "mongoose";

const router = Router();

// THESE ROUTES REQUIRE TO BE LOGGED IN

// ROUTE: GET /api/video/favorites
router.get('/', verifyToken, fetchFavorites);
// ROUTE: POST /api/video/favorites
router.post('/', verifyToken, addFavorite);
// ROUTE: DELETE /api/video/favorites   
router.delete('/:id', verifyToken, removeFavorite);

export default router;