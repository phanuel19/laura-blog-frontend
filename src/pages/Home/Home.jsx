import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useNavigate } from "react-router";
import firstImage from "../../../public/depressed.jpg";
import VideosCard from "../../components/Cards/Videos/VideosCard";
import { sampleVideos } from "../../data/sampleVideos";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="px-4 sm:px-8 md:px-20 lg:px-40 py-10 space-y-24 text-gray-800 pt-20">
      <section className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Prenons soin de notre esprit, chaque jour
          </h1>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            repudiandae quas aliquid amet officia suscipit autem distinctio...
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            velit vitae illo qui incidunt cum aspernatur suscipit, officia sint
            pariatur id commodi voluptatem quaerat temporibus. Ullam, excepturi
            repellendus! Maiores, illo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button className="px-4 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800">
              Découvrir
            </button>
            <button className="px-4 py-2 rounded-full border border-gray-500 text-gray-800 hover:bg-gray-100">
              M’informer
            </button>
          </div>
        </div>
        <div className="md:w-1/2 bg-gray-100 rounded-xl h-64 w-full flex items-center justify-center">
          <img src={firstImage} alt="" className=" rounded-lg" />
        </div>
      </section>

      {/* Réseaux sociaux */}
      <section className="space-y-1 text-center md:text-left">
        <h4 className=" font-semibold">Rejoins-nous sur :</h4>
        <div className="flex flex-wrap justify-center md:justify-start gap-6 items-center">
          {[
            { name: "Google", icon: GoogleIcon, link: "#" },
            { name: "YouTube", icon: YouTubeIcon, link: "#" },
            { name: "Instagram", icon: InstagramIcon, link: "#" },
            { name: "Whatsapp", icon: WhatsAppIcon, link: "#" },
          ].map((e, idx) => (
            <a href={e.link} className="  flex items-center" key={idx}>
              {" "}
              <e.icon /> {e.name}
            </a>
          ))}
        </div>
      </section>

      {/* Nouvelles thématiques */}
      <section className="space-y-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Nouvelles Thématiques
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleVideos.filter((e)=> e.id < 7).map((video) => (
            <VideosCard
              key={video.id}
              video={video}
              onClick={() => navigate(`/videos`, { preventScrollReset: true })}
              // Assure-toi que le chemin est correct
            />
          ))}
        </div>
        <button
          className="mt-6 px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
          onClick={() => navigate("/videos", { preventScrollReset: true })}
        >
          Découvrir Plus 
        </button>
      </section>

      {/* Logos partenaires 
      // <section className="py-12 bg-gray-50 rounded-xl flex flex-wrap justify-center items-center gap-8 sm:gap-10">
      //   {[
      //     { name: "Google", icon: GoogleIcon },
      //     { name: "YouTube", icon: FaYoutube },
      //     { name: "Instagram", icon: FaInstagram },
      //     { name: "X", icon: FaXTwitter },
      //     { name: "LinkedIn", icon: FaLinkedin },
      //     { name: "Whatsapp", icon: FaWhatsapp },
      //   ].map((partner, idx) => (
      //     <span
      //       key={idx}
      //       className="text-base sm:text-lg font-semibold text-gray-500 flex items-center gap-2"
      //     >
      //       <partner.icon className="text-xl" />
      //       {partner.name}
      //     </span>
      //   ))}
      // </section>

      Témoignages
      <section className="text-center space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Avis Utilisateurs</h2>
        <p className="text-gray-500 max-w-xl mx-auto px-2">
          Lorem ipsum dolor sit amet consectetur adipiscing elit mattis sit
          phasellus mollis sit aliquam sit nullam.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[...Array(3)].map((_, i) => (
            <CommentsCard key={i} />
          ))}
        </div>
      </section> */}

      {/* Faire un témoignage */}
      <section className="text-center py-10 border-t border-gray-200 px-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          <span className="text-blue-900 font-bold">Soutenez</span> nous !{" "}
          <br />
          Faites un <span className="font-bold">Témoignage</span>
        </h2>
        <button className="mt-6 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800">
          Témoigner
        </button>
      </section>
    </main>
  );
}

export default Home;
