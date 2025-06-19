// src/components/Header.jsx
import React, { useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { logout } from '../features/auth/authSlice';
import { BsFillFilePostFill } from "react-icons/bs";
import logo from '../assets/logo.png'
import { SlMagnifier } from "react-icons/sl";
import Navbar from './Navbar';
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { SiYoutubemusic } from "react-icons/si";

const Header = () => {

  const user = useSelector(state => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdown, setIsDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
  <header className="bg-white shadow top-0 z-50">
    <div className='py-2 w-full flex items-center justify-around'>
      <div 
          className='
            flex flex-1 flex-col items-center justify-center gap-2
      '>
        <span className='font-semibold text-blue-900'>
          Thứ bảy, 14/06/2025
        </span>
        <div className='flex items-center gap-2 text-3xl'>
          <FaFacebook className='text-sky-700 cursor-pointer hover:scale-110 transition-all'/>
          <SiYoutubemusic className='text-red-600 cursor-pointer hover:scale-110 transition-all'/>
        </div>
      </div>

      <div className="flex-1 px-4 py-3">
        <div className='flex justify-center items-center flex-col gap-2 italic font-semibold cursor-pointer'>
          <img
            src={`${logo}`} 
            onClick={() => navigate('/')} 
            className="h-20 w-auto
          "/>
        </div>
      </div>

      {
          user.user 
          ?
          <div className='flex-1 flex justify-center items-center'>
            <div
              className="py-1 px-2 flex items-center gap-2 text-blue-900 cursor-pointer rounded hover:bg-slate-200 transition-all
            ">
              <SlMagnifier />
              <p
                onClick={() => navigate('/login')} 
                className="font-semibold">
                  Tìm kiếm
              </p>
            </div>

            <span className='text-slate-400'>
              |
            </span>

            <div
              onClick={() => setIsDropdown(prev => !prev)} 
              className={`
                w-fit relative py-1 px-2 flex items-center justify-center gap-2 rounded text-blue-900 cursor-pointer hover:bg-slate-200 transition-all ${isDropdown ? "bg-slate-100" : ""}
            `}>
              <FaRegUser />
              <p className="font-semibold">Chào, {user?.user?.username}</p>
              <IoIosArrowDown />
              {
                isDropdown && (
                  <div 
                    className='
                      absolute top-full w-[90%] bg-gray-200 rounded 
                  '>
                    <a
                      href="/account"
                      className='flex px-1 py-3 items-center gap-1 font-semibold text-sm border border-t-transparent border-l-transparent border-r-transparent border-b-slate-400 hover:bg-slate-300'
                    >
                      <MdInfoOutline  />
                      Thông tin tài khoản
                    </a>
                    {
                      (user.user.role === "editor" || user.user.role === 'admin') && (
                        <a
                          href="/articles"
                          className='flex px-1 py-3 items-center gap-1 font-semibold text-sm border border-t-transparent border-l-transparent border-r-transparent border-b-slate-400 hover:bg-slate-300'
                        >
                          <BsFillFilePostFill />
                          Quản lý bài đăng
                        </a>
                      )
                    }
                    <a
                      onClick={() => handleLogout()}
                      className='flex px-2 py-3 items-center gap-1 font-semibold text-sm hover:bg-slate-300'
                    >
                      <MdLogout />
                      Đăng xuất
                    </a>
                  </div>
                )
              }
            </div>
          </div>
          :
          <div className='flex-1 flex justify-center items-center'>
            <div
              className="py-1 px-2 flex items-center gap-2 text-blue-900 cursor-pointer rounded hover:bg-slate-200 transition-all
            ">
              <SlMagnifier />
              <p
                onClick={() => navigate('/login')} 
                className="font-semibold">
                  Tìm kiếm
              </p>
            </div>
            <span className='text-slate-400'>
              |
            </span>
            
            <div
              className="py-1 px-2 flex items-center gap-2 text-blue-900 cursor-pointer rounded hover:bg-slate-200 transition-all
            ">
              <FaRegUser />
              <p
                onClick={() => navigate('/login')} 
                className="font-semibold">
                  Đăng nhập
                </p>
            </div>
          </div>
        }
        
    </div>
  </header>
)};


export default Header;
