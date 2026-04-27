/* 
    THIS SCRIPT WILL USE THE SERVER,
    THE MIDDLEWARES, THE DATABASE AND 
    THE ROUTES TO START THE APP
*/

// DONT USE DEFAULT DNS SERVERS, USE CLOUDFLARE DNS
import dns from "node:dns/promises";
// CLOUDFLARE DNS SERVERS
dns.setServers(["1.1.1.1", "1.0.0.1"]);

// IMPORTS
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from "./db";
// IMPORT ROUTES
import authRoutes from "./routes/authRoutes";
import videoRoutes from "./routes/videoRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";

// LOAD ENV VARIABLES
dotenv.config();
// CONNECT TO DB
connectDB();
// CREATE EXPRESS APP
const app = express();
// START SERVER WITH CORS ALLOWED FROM FRONTEND
app.use(cors({
    origin: 'https://innovatube-app.onrender.com',
    credentials: true
}));
// PARSE JSON BODIES (FROM FRONTEND)
app.use(express.json());

// ROUTES
app.get('/', (req, res) => { res.send("[ ✅ SUCESS ]: Welcome to Innovatube API !!!"); });
// USE CUSTOM ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/favorites', favoriteRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`[ ✅ SUCCESS ]: Server is running on port ${PORT}`);
    console.log(`[ ✅ SUCCESS ]: Server is running on https://innovatube-app.onrender.com`);
});