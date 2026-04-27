/* 
THIS FILE IS THE MAIN PAGE, IT SHOWS A GRID OF POPULAR VIDEOS,
IT ALLOWS TO SEARCH VIDEOS, ADD TO FAVORITES AND REMOVE FROM FAVORITES
ALL THE VIDEOS AND FAVORITES ARE FETCHED FROM THE BACKEND
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Typography, TextField, Button, Grid, Card, CardMedia,
    CardContent, IconButton, Box, AppBar, Toolbar, Tabs, Tab, CardActions
} from '@mui/material';
import { Logout, Favorite, FavoriteBorder, PlayArrow, Clear } from '@mui/icons-material';
import api from '../services/api';

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

    // FUNCTIONS DECLARATION
    useEffect(() => {
        fetchFavorites();
        fetchInitialVideos();
    }, []);
    // LOGOUT FUNCTION
    const handleLogout = () => {
        // REMOVE TOKEN AND USERNAME FROM LOCAL STORAGE
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        // NAVIGATE TO LOGIN
        navigate('/login');
    };

    // POPULAR VIDEOS FUNCTION
    const fetchInitialVideos = async () => {
        try {
            // FETCH VIDEOS
            const { data } = await api.get('/videos/load');
            // NORMALIZE VIDEOS
            const normalizedVideos = data.items.map((v: any) => ({
                ...v,
                id: { videoId: v.id }
            }));
            // SET VIDEOS CONTENT FROM BACKEND
            setVideos(normalizedVideos);
        } catch (error) {
            console.error("Error cargando videos iniciales", error);
        }
    };

    // SEARCH FUNCTION
    const handleSearch = async () => {
        // IF QUERY IS EMPTY, RETURN
        if (!query) return;

        try {
            // FETCH VIDEOS FROM BACKEND WITH QUERY
            const { data } = await api.get(`/videos/search?q=${query}`);
            // SET VIDEO DATA FROM BACKEND
            setVideos(data.items);
        } catch (error) {
            alert("Error al buscar videos. Por favor, intenta de nuevo.");
        }
    };


    // FAVORITES FUNCTION'S
    // FETCH FAVORITES
    const fetchFavorites = async () => {
        try {
            // FETCH FAVORITES
            const { data } = await api.get('/favorites');
            // SET FAVORITE DATA FROM BACKEND
            setFavorites(data);
        } catch (error) {
            console.error("Error cargando favoritos", error);
        }
    };
    // ADD VIDEO TO FAVORITES
    const addToFavorites = async (video: any) => {
        try {
            await api.post('/favorites', video);
            // REFRESH FAVORITES AFTER ADDING A VIDEO
            await fetchFavorites();
            alert('Añadido a favoritos');
        } catch (error) {
            alert('Error al añadir a favoritos');
        }
    };
    // REMOVE VIDEO FROM FAVORITES
    const removeFromFavorites = async (id: string) => {
        try {
            // DELETE FAVORITE
            await api.delete(`/favorites/${id}`);
            // SHOW SUCCESS MESSAGE
            alert('Eliminado de favoritos');
            // REFRESH FAVORITES AFTER DELETE
            fetchFavorites();
        } catch (error) {
            console.error("Error al eliminar", error);
            alert('Error al eliminar');
        }
    };
    // FILTER FAVORITES BY QUERY
    const filteredFavorites = favorites.filter((v: any) =>
        v.snippet.title.toLowerCase().includes(favQuery.toLowerCase())
    );
    return (
        <>
            <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'black' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        InnovaTube
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">Hola, <b>{username}</b></Typography>
                        <IconButton color="error" onClick={handleLogout}><Logout /></IconButton>
                    </Box>
                </Toolbar>
                <Tabs value={tabValue} onChange={(_, n) => setTabValue(n)} centered>
                    <Tab label="Explorar" />
                    <Tab label="Favoritos" />
                </Tabs>
            </AppBar>

            <Container sx={{ mt: 4, pb: 4 }}>
                {tabValue === 0 ? (
                    // POPULAR VIDEOS
                    <Box>
                        <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
                            <TextField
                                fullWidth size="small"
                                placeholder="Buscar en YouTube..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <Button variant="contained" onClick={handleSearch}>Buscar</Button>
                            <Button variant="outlined" onClick={() => { setQuery(''), fetchInitialVideos() }}><Clear /></Button>
                        </Box>
                        <Grid container spacing={3}>
                            {videos.map((v: any) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={v.id.videoId}>
                                    <VideoCard
                                        video={v}
                                        onAction={() => addToFavorites(v)}
                                        isFavPage={false}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ) : (
                    // FAVORITE VIDEOS
                    <Box>
                        <TextField
                            fullWidth size="small" sx={{ mb: 4 }}
                            placeholder="Buscar en mis favoritos..."
                            onChange={(e) => setFavQuery(e.target.value)}
                        />
                        <Grid container spacing={3}>
                            {filteredFavorites.map((v: any) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={v._id}>
                                    <VideoCard
                                        video={v}
                                        onAction={() => removeFromFavorites(v._id || v.id?.videoId || v.id)}
                                        isFavPage={true}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Container>
        </>
    );
};

// COMPONENTE DE TARJETA REUTILIZABLE
const VideoCard = ({ video, onAction, isFavPage }: any) => {

    const handleWatchVideo = () => {
        const videoId = typeof video.id === 'string' ? video.id : video.id?.videoId || video.videoId;

        if (!videoId) {
            alert("No se pudo encontrar el ID del video");
            return;
        }

        alert("Estás saliendo de InnovaTube para ir a YouTube.com");
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <CardMedia
                component="img"
                height="160"
                image={video.snippet.thumbnails.medium.url}
                alt="thumbnail"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                {/* CARD TITLE */}
                <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{
                        fontWeight: 'bold',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        height: '3em',
                        lineHeight: '1.5em'
                    }}
                >
                    {video.snippet.title}
                </Typography>

                {/* DESCRIPTION */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontSize: '0.85rem'
                    }}
                >
                    {video.snippet.description || "Sin descripción disponible."}
                </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button
                    startIcon={<PlayArrow />}
                    size="small"
                    onClick={handleWatchVideo}
                >
                    Ver Video
                </Button>

                <IconButton onClick={onAction}>
                    {isFavPage ? (
                        <Favorite sx={{ color: 'red' }} />
                    ) : (
                        <FavoriteBorder sx={{ color: 'gray' }} />
                    )}
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Home;