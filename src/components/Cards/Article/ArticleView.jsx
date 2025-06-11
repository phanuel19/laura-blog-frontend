import { Share2, ArrowLeft } from "lucide-react";
import {
    Box,
    Typography,
    Button,
    Avatar,
    Chip,
    Divider,
    IconButton,
    useMediaQuery,
    useTheme, TextField
} from "@mui/material";
import { teal, grey } from '@mui/material/colors';

export default function ArticleView({ article, onClose }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            maxWidth: 800,
            mx: 'auto',
            px: isMobile ? 2 : 4,
            py: 4,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 2,
                mb: 4
            }}>
                <Box sx={{ flex: 1 }}>
                    <Button
                        startIcon={<ArrowLeft size={18} />}
                        onClick={onClose}
                        sx={{
                            textTransform: 'none',
                            color: teal[700],
                            mb: 2,
                            pl: 0,
                            '&:hover': {
                                backgroundColor: 'transparent'
                            }
                        }}
                    >
                        Retour aux articles
                    </Button>

                    <Typography variant="h4" component="h1" sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: 'text.primary'
                    }}>
                        {article.title}
                    </Typography>

                    <Typography variant="subtitle1" sx={{
                        color: 'text.secondary',
                        fontSize: '1.1rem'
                    }}>
                        {article.subtitle || "Découvrez des informations essentielles sur la santé mentale et des conseils pour votre bien-être."}
                    </Typography>
                </Box>

                <IconButton
                    aria-label="partager"
                    sx={{
                        backgroundColor: grey[100],
                        '&:hover': {
                            backgroundColor: grey[200]
                        }
                    }}
                >
                    <Share2 size={20} />
                </IconButton>
            </Box>

            {/* Subscription */}
            <Box sx={{
                backgroundColor: teal[50],
                p: 3,
                borderRadius: 2,
                mb: 4,
                textAlign: 'center'
            }}>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                    Abonnez-vous pour recevoir nos dernières ressources
                </Typography>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: 2,
                        maxWidth: 500,
                        mx: 'auto'
                    }}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Votre adresse email"
                        size="small"
                        sx={{
                            flex: 1,
                            backgroundColor: 'white',
                            borderRadius: '50px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '50px'
                            }
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            borderRadius: '50px',
                            textTransform: 'none',
                            px: 4,
                            py: 1.5,
                            backgroundColor: teal[700],
                            '&:hover': {
                                backgroundColor: teal[800]
                            }
                        }}
                    >
                        S'abonner
                    </Button>
                </Box>
            </Box>

            {/* Image */}
            <Box sx={{
                width: '100%',
                height: isMobile ? 200 : 350,
                borderRadius: 2,
                overflow: 'hidden',
                mb: 4,
                position: 'relative'
            }}>
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

            {/* Author and metadata */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 3
            }}>
                <Avatar sx={{ width: 48, height: 48 }} />
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {article.author || "Auteur inconnu"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Publié le {article.date || "date inconnue"}
                    </Typography>
                </Box>
            </Box>

            {/* Tags */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                {article.categories?.map((cat) => (
                    <Chip
                        key={cat}
                        label={cat}
                        size="small"
                        sx={{
                            backgroundColor: teal[50],
                            color: teal[700],
                            '& .MuiChip-label': {
                                px: 1.5
                            }
                        }}
                    />
                ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Content */}
            <Box sx={{
                '& p': {
                    mb: 3,
                    lineHeight: 1.8,
                    color: 'text.primary'
                }
            }}>
                {article.content?.split("\n").map((paragraph, idx) => (
                    <Typography key={idx} >
                        {paragraph}
                    </Typography>
                ))}
            </Box>

            {/* Share button */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 6
            }}>
                <Button
                    startIcon={<Share2 size={18} />}
                    variant="outlined"
                    sx={{
                        borderRadius: '50px',
                        textTransform: 'none',
                        px: 4,
                        py: 1.5,
                        borderColor: grey[300],
                        color: 'text.primary',
                        '&:hover': {
                            borderColor: teal[700],
                            backgroundColor: teal[50]
                        }
                    }}
                >
                    Partager cet article
                </Button>
            </Box>
        </Box>
    );
}