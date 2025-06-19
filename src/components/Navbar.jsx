// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHouse } from "react-icons/fa6";

const Navbar = () => {
  const links = [
    { label: <FaHouse />, path: '/' },
    { label: 'Thời sự', path: '/thoisu', value: 'thoisu' },
    { label: 'Chính trị', path: '/chinhtri', value: 'chinhtri'},
    { label: 'Xã hội', path: '/xahoi', value: 'xahoi' },
    { label: 'Khoa học', path: '/khoahoc', value: 'khoahoc' },
    { label: 'Văn hóa - Nghệ thuật', path: '/vanhoanghethuat', value: 'vanhoanghethuat' },
    { label: 'Kinh tế', path: '/kinhte', value: 'kinhte' },
    { label: 'Quốc tế', path: '/quocte', value: 'quocte' },
    { label: 'Tin giả & sự thật', path: '/tingiasuthat', value: 'tingiasuthat' },
    { label: 'Giới trẻ', path: '/gioitre', value: 'gioitre' },
    { label: 'Góc nhìn', path: '/gocnhin', value: 'gocnhin' },
    { label: 'Nhân văn', path: '/nhanvan', value: 'nhanvan' },
    { label: 'Thể thao', path: '/thethao', value: 'thethao' },
    { label: 'Du lịch', path: '/dulich', value: 'dulich' },
    { label: 'Xe', path: '/xe', value: 'xe' },
    { label: 'Nghe-Nhìn 360', path: '/nghenhin360', value: 'nghenhin360' },
  ];

  return (
    <nav className="sticky top-0 z-100 bg-blue-900 w-full">
      <div className="w-full mx-auto py-2 flex justify-center items-center gap-6 text-white font-medium">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `transition-transform duration-200 ease-in-out transform hover:scale-110 text-[14px] ${
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
