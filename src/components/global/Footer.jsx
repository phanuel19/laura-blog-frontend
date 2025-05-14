import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <footer className="  sm:px-6 py-3 mx-30 ">
      <div className="max-w-7xl width-full flex md:flex-row justify-betweenitems-center md:items-start space-y-8 md:space-y-0 md:space-x-16">
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-black rounded-full" />
              <div className="w-2 h-2 bg-black rounded-full" />
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
            <span className="text-black">LAURA</span>

            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-black rounded-full" />
              <div className="w-2 h-2 bg-black rounded-full" />
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
          </div>

          <p className="text-sm leading-snug">
            Prenons soin de notre esprit, chaque jour
          </p>
        </div>

        <div className="flex-2 text-center md:text-left ">
          <h4 className="font-semibold text-[#374151] mb-2">
            Abonnez vous pour recevoir des newsletter
          </h4>
          <form className="flex items-center border rounded-md overflow-hidden shadow-sm">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[black] text-white text-sm px-4 py-2"
            >
              S'abonner
            </button>
          </form>
        </div>

        <div className="flex-1 text-center md:text-left  ">
          <h4 className="font-semibold  mb-2">Follow us</h4>
          <div className="flex justify-center md:justify-start space-x-3  text-lg">
            <GoogleIcon className=" cursor-pointer" />
            <InstagramIcon className=" cursor-pointer" />
            <YouTubeIcon className=" cursor-pointer" />
            <WhatsAppIcon className=" cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
