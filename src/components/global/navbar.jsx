import React from "react";

function Navbar() {
  return (
    <header className="bg-[#2F3F3F] text-white px-6 py-3 rounded-md max-w-screen-xl mx-auto mt-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-semibold flex items-center space-x-2">
        {/* Dot-style logo (simulate with circles) */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-pink-100 rounded-full"></div>
          <div className="w-2 h-2 bg-pink-100 rounded-full"></div>
          <div className="w-2 h-2 bg-pink-100 rounded-full"></div>
        </div>
        <span className="text-pink-100">brix</span>
      </div>

      {/* Navigation links */}
      <nav className="flex items-center space-x-6 text-sm text-gray-100">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/videos" className="hover:underline">
          Videos
        </a>
        <div className="relative group">
          <button className="hover:underline flex items-center">
            Articles
            <svg
              className="ml-1 w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
            </svg>
          </button>
          {/* Dropdown (can add options later) */}
          <div className="absolute left-0 mt-1 hidden group-hover:block bg-white text-black shadow-md rounded-md">
            <a
              href="/articles/blogs"
              className="block px-4 py-2 hover:bg-gray-200"
            >
              Blogs
            </a>
            <a
              href="/articles/news"
              className="block px-4 py-2 hover:bg-gray-200"
            >
              News
            </a>
          </div>
        </div>
        <a href="/contact" className="hover:underline">
          Contacts
        </a>
        <a
          href="/donation"
          className="bg-pink-100 text-gray-800 px-4 py-1 rounded-md text-sm hover:bg-pink-200 transition"
        >
          Faire un don →
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
