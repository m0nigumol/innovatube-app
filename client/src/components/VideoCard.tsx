// src/components/VideoCard.tsx
import {
    Card, CardMedia, CardContent, Typography, Box, Avatar, CardActionArea
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import FavoriteButton from './FavoriteButton';

interface VideoCardProps {
    video: any;
    isFavorite: boolean;
    onToggleFavorite: (video: any) => void;
}

export const VideoCard = ({ video, isFavorite, onToggleFavorite }: VideoCardProps) => {
    // HANDLE WATCH VIDEO
    const handleWatchVideo = () => {
        const videoId = typeof video.id === 'string' ? video.id : video.id?.videoId || video.videoId;
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    };

    return (
        // CARD CONTAINER
        <Card sx={{ bgcolor: 'transparent' }}>
            {/* CLICKABLE CARD */}
            <CardActionArea onClick={handleWatchVideo} sx={{ borderRadius: 1 }}>
                <CardContent sx={{ p: 2, pt: 2 }}>
                    {/* VIDEO THUMBNAIL */}
                    <CardMedia
                        component="img"
                        height="180"
                        loading="lazy"
                        image={video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium.url}
                        alt="thumbnail"
                        sx={{ borderRadius: 1 }}
                    />
                    {/* VIDEO INFORMATION */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                        {/* AVATAR OF THE CHANNEL (THUMBNAIL BY NOW) */}
                        <Avatar src={video.snippet.thumbnails.default.url} />
                        {/* VIDEO INFORMATION */}
                        <Box sx={{ flex: 1 }}>
                            {/* TITLE OF THE VIDEO */}
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    lineHeight: 1.2,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    fontSize: '0.95rem'
                                }}
                            >
                                {video.snippet.title}
                            </Typography>

                            {/* CHANNEL NAME */}
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    mt: 0.5,
                                    fontSize: '0.85rem'
                                }}
                            >
                                {video.snippet.channelTitle}
                            </Typography>
                        </Box>
                        {/* FAVORITE BUTTON */}
                        <FavoriteButton
                            onClick={(e) => { e.stopPropagation(), onToggleFavorite(video) }}
                            size="small"
                        >
                            {isFavorite ?
                                (<Favorite sx={{ color: 'primary.main' }} />)
                                :
                                (<FavoriteBorder />)
                            }
                        </FavoriteButton>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};