// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
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
import { IoIosCloseCircleOutline } from "react-icons/io";
import { searchArticles } from '../features/articles/articleSlice';

const Header = () => {

  const user = useSelector(state => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdown, setIsDropdown] = useState(false);
  const [search, setSearch] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (search) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300); // match với thời gian fadeOut
      return () => clearTimeout(timeout);
    }
  }, [search]);

  const handleLogout = () => {
    dispatch(logout())
  }

  function getFormattedDate() {
    const date = new Date();

    // Tùy chọn định dạng theo ngôn ngữ "vi-VN"
    const formatted = date.toLocaleDateString('vi-VN', {
      weekday: 'long',    // Thứ hai, Thứ ba, ...
      day: '2-digit',     // 01, 02, ...
      month: '2-digit',   // 01, 02, ...
      year: 'numeric'     // 2025
    });

    return formatted;
  }

  const handleSearch = async () => {
    // await dispatch(searchArticles(keyword))
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword.trim())}`);
      setSearch(false);
    }
  }

  return (
  <header className="bg-white shadow top-0 z-110">
    <div className='py-2 w-full flex items-center justify-around'>
      <div 
          className='
            flex flex-1 flex-col items-center justify-center gap-2
      '>
        <span className='font-semibold text-blue-900'>
          {
            getFormattedDate()
          }
        </span>
        <div className='flex items-center gap-2 text-3xl'>
          <FaFacebook
            onClick={() => window.open('https://www.facebook.com/baodientukienvan')} 
            className='text-sky-700 cursor-pointer hover:scale-110 transition-all
          '/>
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
          <div className='relative flex-1 flex justify-center items-center z-200'>
            {isVisible && (
              <div
                className={`
                  absolute top-0 left-0 w-[90%] h-10 p-2 flex items-center gap-2
                  border border-slate-300 rounded bg-white z-200 shadow
                  transition-all duration-300 ease-out transform
                  ${search
                    ? 'animate-[fadeIn_0.3s_ease-out_forwards]'
                    : 'animate-[fadeOut_0.3s_ease-out_forwards]'
                  }
                `}
              >
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Tìm kiếm bài viết..."
                  className="w-full h-full px-4 rounded outline-none"
                />
                <SlMagnifier
                  onClick={handleSearch} 
                  className="text-xl cursor-pointer font-bold hover:text-blue-900 transition-all
                "/>
                <IoIosCloseCircleOutline
                  onClick={() => setSearch(false)}
                  className="text-2xl cursor-pointer font-bold hover:text-red-500 transition-all"
                />
              </div>
            )}

            <div
              className="py-1 px-2 flex items-center gap-2 text-blue-900 cursor-pointer rounded hover:bg-slate-200 transition-all
            ">
              <SlMagnifier />
              <p
                onClick={() => setSearch(true)} 
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
                      absolute top-full z-100 w-[90%] bg-gray-200 rounded 
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
          <div className='relative flex-1 flex justify-center items-center'>
            {isVisible && (
              <div
                className={`
                  absolute top-0 left-0 w-[90%] h-10 p-2 flex items-center gap-2
                  border border-slate-300 rounded bg-white z-200 shadow
                  transition-all duration-300 ease-out transform
                  ${search
                    ? 'animate-[fadeIn_0.3s_ease-out_forwards]'
                    : 'animate-[fadeOut_0.3s_ease-out_forwards]'
                  }
                `}
              >
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Tìm kiếm bài viết..."
                  className="w-full h-full px-4 rounded outline-none"
                />
                <SlMagnifier
                  onClick={handleSearch} 
                  className="text-xl cursor-pointer font-bold hover:text-blue-900 transition-all
                "/>
                <IoIosCloseCircleOutline
                  onClick={() => setSearch(false)}
                  className="text-2xl cursor-pointer font-bold hover:text-red-500 transition-all"
                />
              </div>
            )}
            <div
              className="py-1 px-2 flex items-center gap-2 text-blue-900 cursor-pointer rounded hover:bg-slate-200 transition-all
            ">
              <SlMagnifier />
              <p
                onClick={() => setSearch(true)} 
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
