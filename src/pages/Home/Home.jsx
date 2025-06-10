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

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
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
      <main className="px-4 xs:px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40 py-6 sm:py-10 space-y-16 md:space-y-20 lg:space-y-24 text-gray-800 pt-16 sm:pt-20">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10">
          <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Prenons soin de notre esprit, chaque jour
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
              repudiandae quas aliquid amet officia suscipit autem distinctio...
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
              velit vitae illo qui incidunt cum aspernatur suscipit, officia sint
              pariatur id commodi voluptatem quaerat temporibus.
            </p>
            <div className="flex flex-col xs:flex-row justify-center md:justify-start gap-3 sm:gap-4">
              <button
                  className="px-4 py-2 text-sm sm:text-base bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-colors"
                  onClick={() => navigate("/videos")}
              >
                Découvrir
              </button>
              <button className="px-4 py-2 text-sm sm:text-base rounded-full border border-gray-500 text-gray-800 hover:bg-gray-100 transition-colors">
                M'informer
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-gray-100 rounded-xl h-48 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center mt-4 md:mt-0">
            <span className="text-gray-400">Image illustrative</span>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="space-y-2 text-center md:text-left">
          <h4 className="text-sm sm:text-base font-semibold">Rejoins-nous sur :</h4>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 items-center">
            {[
              { name: "Google", icon: GoogleIcon, link: "#" },
              { name: "YouTube", icon: YouTubeIcon, link: "#" },
              { name: "Instagram", icon: InstagramIcon, link: "#" },
              { name: "Whatsapp", icon: WhatsAppIcon, link: "#" },
            ].map((e, idx) => (
                <a
                    href={e.link}
                    className="flex items-center gap-1 text-sm sm:text-base hover:text-blue-800 transition-colors"
                    key={idx}
                >
                  <e.icon fontSize={isMobile ? "small" : "medium"} />
                  <span>{e.name}</span>
                </a>
            ))}
          </div>
        </section>

        {/* New Themes Section - CORRIGÉ */}
        <section className="space-y-6 sm:space-y-8 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Nouvelles Thématiques
          </h2>
          <div className={`
          grid 
          ${isMobile ? 'grid-cols-1' : ''}
          ${isTablet ? 'grid-cols-2' : ''}
          ${!isMobile && !isTablet ? 'grid-cols-3' : ''}
          gap-4 sm:gap-6
        `}>
            {sampleVideos.filter((e) => e.id < 8).map((video) => (
                <VideosCard
                    key={video.id}
                    video={video}
                    onClick={() => navigate(`/videos`)}
                    compact={isMobile}
                />
            ))}
          </div>
          <button
              className="mt-4 sm:mt-6 px-5 sm:px-6 py-1.5 sm:py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors text-sm sm:text-base"
              onClick={() => navigate("/videos")}
          >
            Découvrir Plus
          </button>
        </section>

        {/* Testimonials CTA Section */}
        <section className="text-center py-8 sm:py-10 border-t border-gray-200 px-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
            <span className="text-blue-900 font-bold">Soutenez</span> nous !{" "}
            <br className="hidden sm:block" />
            Faites un <span className="font-bold">Témoignage</span>
          </h2>
          <button
              className="mt-4 sm:mt-6 px-5 sm:px-6 py-1.5 sm:py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm sm:text-base"
              onClick={() => navigate('/testimonials')}
          >
            Témoigner
          </button>
        </section>
      </main>
  );
}

export default Home;