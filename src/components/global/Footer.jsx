import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Google as GoogleIcon,
  Instagram as InstagramIcon,
  WhatsApp as WhatsAppIcon,
  YouTube as YouTubeIcon
} from '@mui/icons-material';
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

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
      <ThemeProvider theme={theme}>
        <Box
            component="footer"
            sx={{
              backgroundColor: 'white',
              color: 'text.primary',
              px: { xs: 2, sm: 4 },
              py: 6,
              borderTop: `1px solid ${grey[200]}`
            }}
        >
          <Box
              sx={{
                maxWidth: 'lg',
                mx: 'auto',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 4, md: 8 },
                alignItems: { xs: 'center', md: 'flex-start' }
              }}
          >
            {/* Logo and description */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: 1,
                mb: 2
              }}>
                {[...Array(3)].map((_, i) => (
                    <Box
                        key={`dot-left-${i}`}
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: 'primary.main',
                          borderRadius: '50%'
                        }}
                    />
                ))}
                <Typography
                    variant="h6"
                    component="span"
                    sx={{
                      fontWeight: 700,
                      mx: 1
                    }}
                >
                  LAURA
                </Typography>
                {[...Array(3)].map((_, i) => (
                    <Box
                        key={`dot-right-${i}`}
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: 'primary.main',
                          borderRadius: '50%'
                        }}
                    />
                ))}
              </Box>
              <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    maxWidth: 300,
                    mx: { xs: 'auto', md: 0 }
                  }}
              >
                Prenons soin de notre esprit, chaque jour
              </Typography>
            </Box>

            {/* Newsletter */}
            <Box sx={{ flex: 1 }}>
              <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    textAlign: { xs: 'center', md: 'left' }
                  }}
              >
                Abonnez-vous à notre newsletter
              </Typography>
              <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1}
                  sx={{ maxWidth: 400, mx: { xs: 'auto', md: 0 } }}
              >
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Votre email"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '50px',
                        backgroundColor: 'white'
                      }
                    }}
                />
                <Button
                    variant="contained"
                    sx={{
                      borderRadius: '50px',
                      textTransform: 'none',
                      px: 3,
                      whiteSpace: 'nowrap',
                      backgroundColor: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.dark'
                      }
                    }}
                >
                  S'abonner
                </Button>
              </Stack>
            </Box>

            {/* Social media */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'right' } }}>
              <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    mb: 2
                  }}
              >
                Suivez-nous
              </Typography>
              <Stack
                  direction="row"
                  spacing={2}
                  justifyContent={{ xs: 'center', md: 'flex-end' }}
              >
                <IconButton
                    aria-label="Google"
                    sx={{
                      backgroundColor: grey[100],
                      '&:hover': {
                        backgroundColor: grey[200]
                      }
                    }}
                >
                  <GoogleIcon />
                </IconButton>
                <IconButton
                    aria-label="Instagram"
                    sx={{
                      backgroundColor: grey[100],
                      '&:hover': {
                        backgroundColor: grey[200]
                      }
                    }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                    aria-label="YouTube"
                    sx={{
                      backgroundColor: grey[100],
                      '&:hover': {
                        backgroundColor: grey[200]
                      }
                    }}
                >
                  <YouTubeIcon />
                </IconButton>
                <IconButton
                    aria-label="WhatsApp"
                    sx={{
                      backgroundColor: grey[100],
                      '&:hover': {
                        backgroundColor: grey[200]
                      }
                    }}
                >
                  <WhatsAppIcon />
                </IconButton>
              </Stack>
            </Box>
          </Box>

          {/* Divider and copyright */}
          <Divider sx={{ my: 4, borderColor: grey[200] }} />
          <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                color: 'text.secondary'
              }}
          >
            © {new Date().getFullYear()} LAURA - Tous droits réservés
          </Typography>
        </Box>
      </ThemeProvider>
  );
}

export default Footer;