/* 
THIS FILE IS THE MAIN PAGE, IT SHOWS A GRID OF POPULAR VIDEOS,
IT ALLOWS TO SEARCH VIDEOS, ADD TO FAVORITES AND REMOVE FROM FAVORITES
ALL THE VIDEOS AND FAVORITES ARE FETCHED FROM THE BACKEND
 */

import { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Navbar } from '../components/NavBar';
import { SearchBar } from '../components/SearchBar';
import { VideoCard } from '../components/VideoCard';

const Home = () => {
    // HOOKS DECLARATION
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    // STATE DECLARATION
    const [tabValue, setTabValue] = useState(0);
    const [query, setQuery] = useState('');
    const [videos, setVideos] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [favQuery, setFavQuery] = useState('');
    // EFFECT DECLARATION
    useEffect(() => {
        fetchFavorites();
        fetchInitialVideos();
    }, []);

    // FUNCTION DECLARATION
    // INITIAL FETCH
    const fetchInitialVideos = async () => {
        const { data } = await api.get('/videos/load');
        setVideos(data.items.map((v: any) => ({ ...v, id: { videoId: v.id } })));
    };
    // HANDLE SEARCH (FOR POPULAR VIDEOS TAB)
    const handleSearch = async () => {
        if (!query) return;
        const { data } = await api.get(`/videos/search?q=${query}`);
        setVideos(data.items);
    };
    // FETCH FAVORITES PER USER FROM BACKEND
    const fetchFavorites = async () => {
        const { data } = await api.get('/favorites');
        setFavorites(data);
    };
    // HANDLE TOGGLE FAVORITE (ADD OR REMOVE FROM FAVORITES) IN BACKEND
    const toggleFavorite = async (video: any) => {
        // GET VIDEO ID
        const videoId = video._id || video.id?.videoId || video.id;
        // CHECK IF VIDEO IS ALREADY IN FAVORITES
        const isFav = favorites.some((f: any) => (f._id || f.id?.videoId || f.id) === videoId);
        try {
            // IF VIDEO IS ALREADY IN FAVORITES, REMOVE IT
            if (isFav) {
                await api.delete(`/favorites/${videoId}`);
            }
            // IF VIDEO IS NOT IN FAVORITES, ADD IT
            else {
                await api.post('/favorites', video);
            }
            // REFRESH FAVORITES LIST
            fetchFavorites();
        } catch (error) {
            alert("Error al actualizar favoritos");
        }
    };
    // HANDLE LOGOUT
    const handleLogout = () => {
        // REMOVE TOKEN AND USER FROM LOCAL STORAGE
        localStorage.removeItem('token');
        localStorage.clear();
        // NAVIGATE TO LOGIN
        navigate('/login');
    };

    return (
        <>
            {/* CUSTOM  NAVBAR */}
            <Navbar username={username} tabValue={tabValue} setTabValue={setTabValue} onLogout={handleLogout} />
            {/* MAIN CONTENT */}
            <Box component='main' sx={{ mt: 4, pb: 4 }}>
                {/* CONTENT WRAPPER */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'extend' }}>
                    {/* CUSTOM SEARCH BAR */}
                    <SearchBar
                        // PLACEHOLDER
                        placeholder={tabValue === 0 ? "Buscar en YouTube..." : "Buscar en Favoritos..."}
                        // VALUE OF THE SEARCH BAR
                        value={tabValue === 0 ? query : favQuery}
                        onChange={tabValue === 0 ? setQuery : setFavQuery}
                        // HANDLE SEARCH
                        onSearch={tabValue === 0 ? handleSearch : () => { }}
                        // HANDLE CLEAR
                        onClear={() => { tabValue === 0 && setQuery(''); fetchInitialVideos(); tabValue === 1 && setFavQuery(''); }}
                    />
                    {/* VIDEO GRID */}
                    <Grid container spacing={3}>
                        {
                            // SHOW POPULAR VIDEOS (TAB VALUE 0) OR FAVORITES (TAB VALUE 1)
                            tabValue === 0 ?
                                // SHOW POPULAR VIDEOS
                                videos.map((v: any) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={v.id.videoId}>
                                        <VideoCard video={v}
                                            isFavorite={favorites.some((f: any) => f.id?.videoId === v.id.videoId)}
                                            onToggleFavorite={toggleFavorite} />
                                    </Grid>
                                )) :
                                // SHOW FAVORITES
                                favorites.filter((f: any) => f.snippet.title.toLowerCase().includes(favQuery.toLowerCase())).map((v: any) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={v._id}>
                                        <VideoCard video={v}
                                            isFavorite={true}
                                            onToggleFavorite={toggleFavorite} />
                                    </Grid>
                                ))
                        }
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default Home;