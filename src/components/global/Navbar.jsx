import ArticleIcon from '@mui/icons-material/Article';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { Menu, X } from "lucide-react"; // Icônes Lucide
import { useState } from "react";



function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = (
    <>
    
      <a href="/" className=" items-center">
       <HomeIcon/> Home
      </a>
      <a href="/videos" className="items-cente">
       <VideoLibraryIcon/> Videos
      </a>
      <a href="/articles" className="items-cente">
       <ArticleIcon/> Articles
      </a>
      <a href="/testimonials" className="items-cente">
      <ChatIcon/>  Témoignage
      </a>
      {/* <a
        href="/donation"
        className="bg-pink-100 text-gray-800 px-4 py-1 rounded-md hover:bg-pink-200 transition"
      >
        Faire un don →
      </a> */}
    </>
  );

  return (
    <header className=" px-4 sm:px-6 py-3 rounded-md max-w-7xl mx-auto mt-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-semibold flex items-center gap-2">
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

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center space-x-4 text-sm ">
          {links}
        </nav>

        {/* Burger Button */}
        <button
          onClick={toggleMenu}
          className="sm:hidden  focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-3 text-sm ">
          {links}
        </div>
      )}
    </header>
  );
}

export default Navbar;
