import { Request, Response } from "express";
import axios from 'axios';
import User from "../models/User";


export const loadVideos = async (req: Request, res: Response) => {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=12&regionCode=MX&key=${API_KEY}`;

    try {
        // GET VIDEOS
        console.log(['[ 📹 FETCHING VIDEOS ]: Fetching from --> ', url]);
        const response = await axios.get(url);
        // SEND RESPONSE
        res.json(response.data);
        console.log('[ 🎉 SUCCESS ]: Videos fetched successfully');
    } catch (error) {
        res.status(500).json({ error: "Error al cargar recomendaciones" });
    }
};
export const searchVideos = async (req: Request, res: Response) => {
    const { q } = req.query;
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const url =
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${q}&type=video&key=${API_KEY}`

    try {
        // SEARCH VIDEO QUERY
        console.log([`[ 📨 SEARCHING VIDEO ]: Searching ${q} in --> `, url]);
        const response = await axios.get(url);
        // SEND RESPONSE
        res.json(response.data);
    } catch (error: any) {
        console.error("ERROR DE YOUTUBE:", error.response?.data || error.message);
        res.status(500).json({ error: "Error al conectar con YouTube" });
    }
};