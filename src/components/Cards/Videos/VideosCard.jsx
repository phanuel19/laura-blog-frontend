import { CalendarToday, Person } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { teal, grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: teal[700],
    },
    background: {
      default: grey[50],
    },
  },
});

function VideosCard({ video, onClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  return (
      <ThemeProvider theme={theme}>
        <Card
            onClick={onClick}
            sx={{
              width: '100%',
              maxWidth: 345,
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
            {/* Video Thumbnail */}
            <CardMedia
                component="img"
                height={isMobile ? 160 : 180}
                image={video.thumbnail}
                alt={video.title}
                sx={{
                  objectFit: 'cover',
                  backgroundColor: grey[200]
                }}
            />

            {/* Card Content */}
            <CardContent sx={{ flexGrow: 1 }}>
              {/* Author and Date */}
              <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 1.5 }}
              >
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                >
                  <Person fontSize="inherit" />
                  {video.author || "Auteur inconnu"}
                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                >
                  <CalendarToday fontSize="inherit" />
                  {video.createdAt ? formatDate(video.createdAt) : "Date inconnue"}
                </Typography>
              </Stack>

              {/* Title */}
              <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
              >
                {video.title}
              </Typography>

              {/* Description */}
              <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
              >
                {video.description || "Pas de description disponible."}
              </Typography>

              {/* Categories */}
              <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mt: 'auto'
              }}>
                {video?.categories?.map((cat) => (
                    <Chip
                        key={cat}
                        label={cat}
                        size="small"
                        sx={{
                          backgroundColor: 'primary.light',
                          color: 'primary.dark',
                          fontSize: '0.65rem',
                          height: 24,
                          '& .MuiChip-label': {
                            px: 1
                          }
                        }}
                    />
                ))}
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </ThemeProvider>
  );
}

export default VideosCard;