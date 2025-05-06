import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white text-[#6B7280] py-10 px-6 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-16">
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-[#9CA3AF] rounded-full"></div>
              <div className="w-2 h-2 bg-[#9CA3AF] rounded-full"></div>
              <div className="w-2 h-2 bg-[#9CA3AF] rounded-full"></div>
            </div>
            <span className="text-lg font-semibold text-[#4B5563]">brix</span>
          </div>
          <p className="text-sm leading-snug">
            Lorem ipsum dolor sit amet consectetur <br />
            adipiscing elit aliquam mauris sed ma
          </p>
        </div>

        <div className="flex-1 max-w-md text-center md:text-left">
          <h4 className="font-semibold text-[#374151] mb-2">
            Subscribe to our newsletter
          </h4>
          <form className="flex items-center border rounded-md overflow-hidden shadow-sm">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#4B5563] text-white text-sm px-4 py-2"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h4 className="font-semibold text-[#374151] mb-2">Follow us</h4>
          <div className="flex justify-center md:justify-start space-x-3 text-[#9CA3AF] text-lg">
            <FaFacebookF className="hover:text-[#4B5563] cursor-pointer" />
            <FaTwitter className="hover:text-[#4B5563] cursor-pointer" />
            <FaInstagram className="hover:text-[#4B5563] cursor-pointer" />
            <FaLinkedinIn className="hover:text-[#4B5563] cursor-pointer" />
            <FaYoutube className="hover:text-[#4B5563] cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
