import { Menu, X } from "lucide-react"; // Icônes Lucide
import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = (
    <>
      <a href="/" className="hover:underline">
        Home
      </a>
      <a href="/videos" className="hover:underline">
        Videos
      </a>
      <a href="/articles" className="hover:underline">
        Articles
      </a>
      <a href="/contact" className="hover:underline">
        Contacts
      </a>
      <a
        href="/donation"
        className="bg-pink-100 text-gray-800 px-4 py-1 rounded-md hover:bg-pink-200 transition"
      >
        Faire un don →
      </a>
    </>
  );

  return (
    <header className="bg-[#2F3F3F] text-white px-4 sm:px-6 py-3 rounded-md max-w-7xl mx-auto mt-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-semibold flex items-center gap-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-pink-100 rounded-full" />
            <div className="w-2 h-2 bg-pink-100 rounded-full" />
            <div className="w-2 h-2 bg-pink-100 rounded-full" />
          </div>
          <span className="text-pink-100">brix</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center space-x-4 text-sm text-gray-100">
          {links}
        </nav>

        {/* Burger Button */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-3 text-sm text-gray-100">
          {links}
        </div>
      )}
    </header>
  );
}

export default Navbar;
