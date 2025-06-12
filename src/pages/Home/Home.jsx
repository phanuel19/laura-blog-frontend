import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useNavigate } from "react-router";
import VideosCard from "../../components/Cards/Videos/VideosCard";
import { video } from "../../services/VideoServices.js";
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography, Button, Box, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { teal, indigo, grey, blue } from '@mui/material/colors';

// URL de l'image hero
const HERO_IMAGE_URL = "https://th.bing.com/th/id/OIP.sgqzAuJEoXhGgVhTvE5DZAHaEK?w=309&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";

// Création d'un thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: teal[700],
      light: teal[50],
    },
    secondary: {
      main: indigo[500],
    },
    background: {
      default: grey[50],
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.6,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function Home() {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(muiTheme.breakpoints.up('md'));
  const navigate = useNavigate();
  const [sampleVideos, setSampleVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const result = await video.GetVideos();
      setSampleVideos(result.datas);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: 'background.default' }}>
          {/* Hero Section - Optimisée pour le responsive */}
          <Box sx={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(${HERO_IMAGE_URL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            py: isMobile ? 6 : 10,
            px: 2,
            minHeight: isMobile ? '60vh' : '70vh',
            display: 'flex',
            alignItems: 'center',
          }}>
            <Container maxWidth="lg">
              <Box sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: isMobile ? 4 : 6,
              }}>
                <Box sx={{
                  width: isMobile ? '100%' : '50%',
                  textAlign: isMobile ? 'center' : 'left',
                  color: 'text.primary',
                }}>
                  <Typography variant="h1" component="h1" gutterBottom sx={{
                    fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
                    mb: 3,
                  }}>
                    Prenez soin de votre <Box component="span" sx={{ color: 'primary.main' }}>bien-être mental</Box>
                  </Typography>
                  <Typography variant="body1" sx={{
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    mb: 4,
                    color: 'text.secondary',
                  }}>
                    Découvrez des ressources, conseils et accompagnements pour améliorer votre santé mentale au quotidien.
                    Notre communauté est là pour vous soutenir dans votre parcours vers un équilibre émotionnel.
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 2,
                    justifyContent: isMobile ? 'center' : 'flex-start',
                  }}>
                    <Button
                        variant="contained"
                        size={isMobile ? "medium" : "large"}
                        onClick={() => navigate("/videos")}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: '50px',
                          textTransform: 'none',
                          fontWeight: 600,
                        }}
                    >
                      Explorer nos ressources
                    </Button>
                    <Button
                        variant="outlined"
                        size={isMobile ? "medium" : "large"}
                        onClick={() => navigate("/about")}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: '50px',
                          textTransform: 'none',
                          fontWeight: 600,
                          borderWidth: '2px',
                          '&:hover': {
                            borderWidth: '2px',
                          }
                        }}
                    >
                      En savoir plus
                    </Button>
                  </Box>
                </Box>
                {isDesktop && (
                    <Box sx={{
                      width: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Box sx={{
                        width: '100%',
                        height: isTablet ? '350px' : '400px',
                        borderRadius: '16px',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
                      }}>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          Illustration ou vidéo d'introduction
                        </Typography>
                      </Box>
                    </Box>
                )}
              </Box>
            </Container>
          </Box>

          {/* Valeurs Section - Responsive */}
          <Box sx={{
            py: isMobile ? 6 : 8,
            backgroundColor: 'white',
            px: isMobile ? 2 : 0,
          }}>
            <Container maxWidth="lg">
              <Typography variant="h2" component="h2" align="center" sx={{
                mb: isMobile ? 4 : 6,
                fontSize: isMobile ? '1.8rem' : '2.2rem',
              }}>
                Nos <Box component="span" sx={{ color: 'primary.main' }}>valeurs</Box>
              </Typography>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
                gap: isMobile ? 3 : 4,
              }}>
                {[
                  {
                    title: "Empathie",
                    description: "Nous écoutons et comprenons vos défis sans jugement.",
                    icon: "❤️"
                  },
                  {
                    title: "Expertise",
                    description: "Des contenus validés par des professionnels de santé mentale.",
                    icon: "📚"
                  },
                  {
                    title: "Communauté",
                    description: "Un espace sûr pour partager et se soutenir mutuellement.",
                    icon: "👥"
                  }
                ].map((value, index) => (
                    <Box key={index} sx={{
                      backgroundColor: 'primary.light',
                      borderRadius: '12px',
                      p: isMobile ? 3 : 4,
                      textAlign: 'center',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      }
                    }}>
                      <Typography variant="h3" sx={{
                        fontSize: isMobile ? '2.5rem' : '3rem',
                        mb: isMobile ? 1 : 2,
                        lineHeight: 1,
                      }}>
                        {value.icon}
                      </Typography>
                      <Typography variant="h5" component="h3" sx={{
                        mb: isMobile ? 1 : 2,
                        fontWeight: 600,
                        fontSize: isMobile ? '1.2rem' : '1.3rem',
                      }}>
                        {value.title}
                      </Typography>
                      <Typography variant="body1" sx={{
                        color: 'text.secondary',
                        fontSize: isMobile ? '0.9rem' : '1rem',
                      }}>
                        {value.description}
                      </Typography>
                    </Box>
                ))}
              </Box>
            </Container>
          </Box>

          {/* New Themes Section - Responsive */}
          <Box sx={{
            py: isMobile ? 6 : 8,
            backgroundColor: 'background.default',
            px: isMobile ? 2 : 0,
          }}>
            <Container maxWidth="lg">
              <Typography variant="h2" component="h2" align="center" sx={{
                mb: isMobile ? 2 : 3,
                fontSize: isMobile ? '1.8rem' : '2.2rem',
              }}>
                Nos dernières <Box component="span" sx={{ color: 'primary.main' }}>ressources</Box>
              </Typography>
              <Typography variant="body1" align="center" sx={{
                mb: isMobile ? 4 : 6,
                maxWidth: '700px',
                mx: 'auto',
                fontSize: isMobile ? '0.9rem' : '1rem',
              }}>
                Découvrez nos vidéos et articles récents sur des thématiques variées de santé mentale.
              </Typography>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
                gap: isMobile ? 3 : 4,
              }}>
                {[sampleVideos[0],sampleVideos[1],sampleVideos[3]]?.map((video) => (
                    <VideosCard
                        key={video.id}
                        video={video}
                        onClick={() => navigate(`/videos`)}
                        compact={isMobile}
                    />
                ))}
              </Box>
              <Box sx={{ textAlign: 'center', mt: isMobile ? 4 : 6 }}>
                <Button
                    variant="outlined"
                    size={isMobile ? "medium" : "large"}
                    onClick={() => navigate("/videos")}
                    sx={{
                      px: isMobile ? 4 : 6,
                      py: 1.5,
                      borderRadius: '50px',
                      textTransform: 'none',
                      fontWeight: 600,
                      borderWidth: '2px',
                      '&:hover': {
                        borderWidth: '2px',
                        backgroundColor: 'primary.light',
                      }
                    }}
                >
                  Voir toutes les ressources
                </Button>
              </Box>
            </Container>
          </Box>

          {/* CTA Newsletter - Responsive */}
          <Box sx={{
            py: isMobile ? 6 : 8,
            backgroundColor: 'primary.main',
            color: 'white',
            px: isMobile ? 2 : 0,
          }}>
            <Container maxWidth="md">
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" component="h2" sx={{
                  mb: isMobile ? 2 : 3,
                  fontSize: isMobile ? '1.8rem' : '2.2rem',
                }}>
                  Restez informé
                </Typography>
                <Typography variant="body1" sx={{
                  mb: isMobile ? 3 : 4,
                  fontSize: isMobile ? '0.9rem' : '1.1rem',
                }}>
                  Abonnez-vous à notre newsletter pour recevoir des conseils et ressources exclusives.
                </Typography>
                <Box sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  maxWidth: '600px',
                  mx: 'auto',
                }}>
                  <input
                      type="email"
                      placeholder="Votre email"
                      style={{
                        padding: isMobile ? '10px 14px' : '12px 16px',
                        borderRadius: '50px',
                        border: 'none',
                        width: '100%',
                        fontSize: isMobile ? '0.9rem' : '1rem',
                      }}
                  />
                  <Button
                      variant="contained"
                      size={isMobile ? "medium" : "large"}
                      sx={{
                        px: isMobile ? 3 : 4,
                        py: 1.5,
                        borderRadius: '50px',
                        textTransform: 'none',
                        fontWeight: 600,
                        backgroundColor: 'white',
                        color: 'primary.main',
                        width: isMobile ? '100%' : 'auto',
                        '&:hover': {
                          backgroundColor: grey[100],
                        }
                      }}
                  >
                    S'abonner
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>

          {/* Social Media Section - Responsive */}
          <Box sx={{
            py: isMobile ? 5 : 6,
            backgroundColor: 'white',
            px: isMobile ? 2 : 0,
          }}>
            <Container maxWidth="lg">
              <Typography variant="h5" align="center" sx={{
                mb: isMobile ? 3 : 4,
                fontSize: isMobile ? '1.3rem' : '1.5rem',
              }}>
                Rejoignez notre communauté
              </Typography>
              <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: isMobile ? 2 : 4,
              }}>
                {[
                  { name: "Google", icon: GoogleIcon, color: blue[500] },
                  { name: "YouTube", icon: YouTubeIcon, color: '#FF0000' },
                  { name: "Instagram", icon: InstagramIcon, color: '#E1306C' },
                  { name: "WhatsApp", icon: WhatsAppIcon, color: '#25D366' },
                ].map((e, idx) => (
                    <Button
                        key={idx}
                        variant="outlined"
                        startIcon={<e.icon sx={{ color: e.color }} />}
                        sx={{
                          borderRadius: '50px',
                          px: isMobile ? 2 : 3,
                          py: isMobile ? 1 : 1.5,
                          textTransform: 'none',
                          borderColor: grey[300],
                          fontSize: isMobile ? '0.8rem' : '0.9rem',
                          '&:hover': {
                            borderColor: e.color,
                            backgroundColor: `${e.color}10`,
                          }
                        }}
                        onClick={() => window.open('#', '_blank')}
                    >
                      {e.name}
                    </Button>
                ))}
              </Box>
            </Container>
          </Box>

          {/* Testimonials CTA Section - Responsive */}
          <Box sx={{
            py: isMobile ? 6 : 8,
            backgroundColor: 'background.default',
            px: isMobile ? 2 : 0,
          }}>
            <Container maxWidth="md">
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" component="h2" sx={{
                  mb: isMobile ? 2 : 3,
                  fontSize: isMobile ? '1.8rem' : '2.2rem',
                }}>
                  <Box component="span" sx={{ color: 'primary.main' }}>Partagez</Box> votre expérience
                </Typography>
                <Typography variant="body1" sx={{
                  mb: isMobile ? 3 : 4,
                  fontSize: isMobile ? '0.9rem' : '1.1rem',
                  maxWidth: '700px',
                  mx: 'auto',
                }}>
                  Votre témoignage peut aider d'autres personnes dans leur parcours. Ensemble, brisons les tabous autour de la santé mentale.
                </Typography>
                <Button
                    variant="contained"
                    size={isMobile ? "medium" : "large"}
                    onClick={() => navigate('/testimonials')}
                    sx={{
                      px: isMobile ? 4 : 6,
                      py: 1.5,
                      borderRadius: '50px',
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                >
                  Ajouter un témoignage
                </Button>
              </Box>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
  );
}

export default Home;