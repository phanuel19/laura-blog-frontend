import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {
  FiAlertCircle,
  FiHeart,
  FiMessageSquare,
  FiSend,
  FiUser,
} from "react-icons/fi";
import {testimonialService} from "../../services/TestimonialsServices.js";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
          className="w-full"
      >
        {value === index && (
            <Box sx={{ p: 3 }} className="h-full">
              <Typography component="div" className="h-full">
                {children}
              </Typography>
            </Box>
        )}
      </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Testimonials = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [testimonies, setTestimonies] = useState([]);
  const [value, setValue] = useState(0);
  const [newTestimony, setNewTestimony] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [liked, setLiked] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newTestimony?.trim()) {
      setError("Veuillez écrire votre témoignage avant de soumettre");
      return;
    }

    if (newTestimony?.length < 20) {
      setError("Votre témoignage doit contenir au moins 20 caractères");
      return;
    }

    const testimony = {
      content: newTestimony,
    };
    testimonialService.addTestimonial(testimony);
    setNewTestimony("");
    setError("");
    setSuccess("Merci pour votre témoignage ! Il a été publié anonymement.");

    setTimeout(() => setSuccess(""), 3000);
  };

  const handleLike = (id) => {
    if (liked){
      testimonialService.removeLikeFromTestimonial(id)
      setLiked(false)
    }
    else {
      testimonialService.addLikeToTestimonial(id);
      setLiked(true);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const fetchTestimonials = async () => {
    try {
      const result = await testimonialService.getAllTestimonials()
      setTestimonies(result.datas);
    }catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [liked]);

  return (
      <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: isMobile ? 'column' : 'row',
            minHeight: "calc(100vh - 64px)",
            height: 'auto',
          }}
          className="w-full mx-auto p-4 md:p-6"
      >
        <Tabs
            orientation={isMobile ? "horizontal" : "vertical"}
            variant={isMobile ? "fullWidth" : "scrollable"}
            value={value}
            onChange={handleChange}
            aria-label="Testimonial tabs"
            sx={{
              borderRight: isMobile ? 0 : 1,
              borderBottom: isMobile ? 1 : 0,
              borderColor: "divider",
              minWidth: isMobile ? '100%' : 200,
              maxWidth: isMobile ? '100%' : 200,
              mb: isMobile ? 2 : 0,
            }}
        >
          <Tab label="Témoignages" {...a11yProps(0)} />
          <Tab label="Écrire" {...a11yProps(1)} />
        </Tabs>

        <Box className="flex-1 w-full" sx={{
          height: isMobile ? 'auto' : '100%',
          overflow: 'auto'
        }}>
          <TabPanel value={value} index={0}>
            <div className="space-y-6 h-full">
              <h3 className="text-xl font-semibold text-gray-700">
                Témoignages récents ({testimonies?.length})
              </h3>

              {testimonies.length === 0 ? (
                  <p className="text-gray-500 italic">
                    Aucun témoignage pour le moment. Soyez le premier à partager !
                  </p>
              ) : (
                  <div className="space-y-4 pr-0 md:pr-4 overflow-y-auto" style={{
                    maxHeight: isMobile ? 'none' : 'calc(100vh - 200px)'
                  }}>
                    {testimonies?.map((testimony) => (
                        <div
                            key={testimony.id}
                            className="border border-gray-200 rounded-lg p-4 md:p-5 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center mb-2 text-gray-500 text-sm flex-wrap gap-1">
                            <FiUser className="mr-1" />
                            <span>Anonyme</span>
                            <span className="mx-1">•</span>
                            <span>{formatDate(testimony.created_at)}</span>
                          </div>
                          <p className="text-gray-700 mb-3 md:mb-4">{testimony.content}</p>
                          <button
                              onClick={() => handleLike(testimony.id)}
                              className="flex items-center text-gray-500 hover:text-red-500 transition-colors text-sm md:text-base"
                          >
                            <FiHeart
                                className={`mr-1 ${
                                    testimony.likes > 0 ? "fill-current text-red-500" : ""
                                }`}
                            />
                            <span>
                        {testimony?.likes} soutien
                              {testimony.likes !== 1 ? "s" : ""}
                      </span>
                          </button>
                        </div>
                    ))}
                  </div>
              )}
            </div>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <div className="h-full flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                <FiMessageSquare className="mr-2" /> Espace Témoignages Anonymes
              </h2>

              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                Partagez votre histoire en toute confidentialité. Votre identité
                ne sera jamais dévoilée.
              </p>

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="flex-1 flex flex-col">
                <textarea
                    value={newTestimony}
                    onChange={(e) => {
                      setNewTestimony(e.target.value);
                      setError("");
                    }}
                    placeholder="Écrivez votre témoignage ici..."
                    className="flex-1 w-full p-3 md:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                    maxLength={1000}
                    rows={isMobile ? 8 : 12}
                />
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2 gap-2 md:gap-0">
                    <div className="text-xs md:text-sm text-gray-500">
                      {newTestimony.length}/1000 caractères
                    </div>
                    <button
                        type="submit"
                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base w-full md:w-auto justify-center"
                    >
                      <FiSend className="mr-2" /> Publier anonymement
                    </button>
                  </div>
                </div>

                {error && (
                    <div className="mt-2 flex items-center text-red-600 text-sm md:text-base">
                      <FiAlertCircle className="mr-2" /> {error}
                    </div>
                )}

                {success && (
                    <div className="mt-3 md:mt-4 p-2 md:p-3 bg-green-100 text-green-700 rounded-lg text-sm md:text-base">
                      {success}
                    </div>
                )}
              </form>
            </div>
          </TabPanel>
        </Box>
      </Box>
  );
};

export default Testimonials;
