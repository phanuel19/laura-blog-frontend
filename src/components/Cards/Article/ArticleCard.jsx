import {
    Box,
    Typography,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { teal } from '@mui/material/colors';

export default function ArticleCard({ article, onClick }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Card
            onClick={onClick}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                }
            }}
        >
            <CardActionArea sx={{ flex: 1 }}>
                <Box
                    sx={{
                        height: isMobile ? 180 : 220,
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '60%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)'
                        }
                    }}
                >
                    <Box
                        component="img"
                        src={article.image}
                        alt={article.title}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </Box>

                <CardContent sx={{
                    position: 'relative',
                    mt: -8,
                    zIndex: 1,
                    color: 'white',
                    pb: '16px !important'
                }}>
                    <Box sx={{ mb: 1 }}>
                        {article.categories?.slice(0, 2).map((cat, index) => (
                            <Chip
                                key={index}
                                label={cat}
                                size="small"
                                sx={{
                                    mr: 1,
                                    mb: 1,
                                    backgroundColor: teal[500],
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    height: 20
                                }}
                            />
                        ))}
                    </Box>

                    <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                            display: '-webkit',
                            lineClamp: 2,
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {article.title}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            lineClamp: 2,
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            opacity: 0.9,
                            fontSize: '0.875rem'
                        }}
                    >
                        {article.description}
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 2,
                        '& .MuiTypography-root': {
                            fontSize: '0.75rem',
                            opacity: 0.8
                        }
                    }}>
                        <Typography variant="caption">
                            {article.date || ''}
                        </Typography>
                        <Box sx={{
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            opacity: 0.8,
                            mx: 1
                        }} />
                        <Typography variant="caption">
                            {article.readTime || '5 min'} de lecture
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}