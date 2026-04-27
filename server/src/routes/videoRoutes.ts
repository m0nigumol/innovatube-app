import { Router } from "express";
import { loadVideos, searchVideos } from "../controllers/videoController";
import verifyToken from "../middlewares/authMiddleware";
import { get } from "mongoose";

const router = Router();

// THESE ROUTES REQUIRE TO BE LOGGED IN
// ROUTE: GET /api/videos
router.get('/load', verifyToken, loadVideos);
// ROUTE: GET /api/videos
router.get('/search', verifyToken, searchVideos);

export default router;