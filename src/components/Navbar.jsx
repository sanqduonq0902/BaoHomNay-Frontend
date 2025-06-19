// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const links = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Thời sự', path: '/thoisu', value: 'thoisu' },
    { label: 'Chính trị', path: '/chinhtri', value: 'chinhtri'},
    { label: 'Xã hội', path: '/xahoi', value: 'xahoi' },
    { label: 'Khoa học', path: '/khoahoc', value: 'khoahoc' },
    { label: 'Văn hóa - Nghệ thuật', path: '/vanhoanghethuat', value: 'vanhoanghethuat' },
    { label: 'Kinh tế', path: '/kinhte', value: 'kinhte' },
    { label: 'Quốc tế', path: '/quocte', value: 'quocte' },
    { label: 'Tin giả & sự thật', path: '/tingiasuthat', value: 'tingiasuthat' },
  ];

  return (
    <nav className="sticky top-0 bg-blue-900 w-full">
      <div className="max-w-screen-xl mx-auto w-full py-2 flex justify-center items-center gap-6 text-white font-medium">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `transition-transform duration-200 ease-in-out transform hover:scale-110 ${
                isActive ? 'underline underline-offset-4' : ''
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
