// src/components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaYoutube } from 'react-icons/fa';
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-white mt-2 py-2 text-sm text-gray-600 ">
      <hr className='w-full h-2 bg-blue-900'/>
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center gap-4 text-center">
        <img src={logo} alt="" />

        {/* Social */}
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800 transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
          >
            <FaYoutube />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-500">
          <p>© 2025 Báo điện tử Kiến Văn</p>
          <p>Phát triển bởi sinh viên – Website phục vụ môn học</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
