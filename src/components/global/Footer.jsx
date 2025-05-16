import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <footer className="w-full px-4 sm:px-6 py-6 md:py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-8 lg:gap-12">
        {/* Logo and slogan section */}
        <div className="w-full md:flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-black rounded-full" />
              <div className="w-2 h-2 bg-black rounded-full" />
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
            <span className="text-black font-medium">LAURA</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-black rounded-full" />
              <div className="w-2 h-2 bg-black rounded-full" />
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
          </div>
          <p className="text-sm md:text-base leading-snug text-gray-600">
            Prenons soin de notre esprit, chaque jour
          </p>
        </div>

        {/* Newsletter section */}
        <div className="w-full md:flex-1 text-center md:text-left">
          <h4 className="font-semibold text-gray-700 mb-2 text-sm md:text-base">
            Abonnez vous pour recevoir des newsletters
          </h4>
          <form className="flex flex-col sm:flex-row items-stretch max-w-xs mx-auto md:mx-0 md:max-w-md">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-3 py-2 text-sm border rounded-t-md sm:rounded-tr-none sm:rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button
              type="submit"
              className="bg-black text-white text-sm px-4 py-2 rounded-b-md sm:rounded-bl-none sm:rounded-r-md hover:bg-gray-800 transition-colors"
            >
              S'abonner
            </button>
          </form>
        </div>

        {/* Social media section */}
        <div className="w-full md:flex-1 text-center md:text-left">
          <h4 className="font-semibold text-gray-700 mb-2 text-sm md:text-base">
            Follow us
          </h4>
          <div className="flex justify-center md:justify-start space-x-4 text-gray-600">
            <GoogleIcon className="cursor-pointer hover:text-gray-800 transition-colors" />
            <InstagramIcon className="cursor-pointer hover:text-gray-800 transition-colors" />
            <YouTubeIcon className="cursor-pointer hover:text-gray-800 transition-colors" />
            <WhatsAppIcon className="cursor-pointer hover:text-gray-800 transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;