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

// LOAD ENV VARIABLES
dotenv.config();

// CONNECT TO DB
connectDB();

// CREATE EXPRESS APP
const app = express();

// CORS: ALLOW CROSS-ORIGIN REQUESTS (FROM FRONTEND)
app.use(cors());
// PARSE JSON BODIES (FROM FRONTEND)
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
    res.send("[ ✅ SUCESS ]: Welcome to Innovatube API !!!");
});
// USE CUSTOM ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);


// INITIALIZE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[ ✅ SUCCESS ]: Server is running on port ${PORT}`);
});