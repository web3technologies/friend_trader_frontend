import React, { useState } from 'react';
import { FaSearch, FaBell, FaUserCircle, FaCog, FaMoon, FaBars, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme, toggleSidebarOpen } = useTheme();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const iconClass = hoverBg => {
    return `p-2 rounded-full transition-transform transform hover:scale-105 ${theme === 'light' ? 'hover:bg-gradient-to-r hover:from-blue-300 hover:to-pink-400' : 'hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-500'} ${hoverBg} cursor-pointer`;
  };

  const SearchInput = ({ isModal }) => (
    <div className={`relative ${isModal ? '' : 'w-56 ml-4 hidden md:block'}`}>
      <input
        autoFocus={isModal}
        className={`pl-8 pr-4 py-1 rounded w-full bg-opacity-40 backdrop-blur-md border border-transparent focus:border focus:border-indigo-300 transition-all ${theme === 'light' ? 'bg-white text-gray-800 placeholder-gray-500' : 'bg-black text-white placeholder-gray-300'}`}
        type="text"
        placeholder="Search..."
      />
      <FaSearch className={`absolute top-1/2 transform -translate-y-1/2 left-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} />
    </div>
  );

  return (
    <div className={`flex justify-between items-center py-2 px-4 shadow-2xl bg-gradient-to-r ${theme === 'light' ? 'from-white to-gray-100' : 'from-gray-900 to-black'}`}>
      
      {/* Hamburger Menu */}
      <div onClick={toggleSidebarOpen} className={iconClass('')}>
        <FaBars className={theme === 'light' ? 'text-gray-800' : 'text-white'} />

      </div>

      <div className="flex items-center space-x-4">
        <div className="flex space-x-2 items-center">
          <div className={iconClass('')}>
            <FaBell />
          </div>
          <div className={iconClass('')}>
            <FaUserCircle />
          </div>
          <div className={iconClass('')}>
            <FaCog />
          </div>
        </div>

        <div className={`rounded-full p-1 transition-transform transform hover:scale-105 ${theme === 'light' ? 'bg-gradient-to-r from-blue-300 to-pink-400' : 'bg-gradient-to-r from-purple-600 to-indigo-500'} cursor-pointer`} onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon className="text-dark-primary p-2 rounded-full bg-black" /> : <FaSun className="text-dark-primary p-2 rounded-full bg-yellow-500" />}
        </div>

        <SearchInput isModal={false} />
      </div>

      <div className="md:hidden">
        <FaSearch className={iconClass('')} onClick={() => setIsSearchModalOpen(true)} />
      </div>

      {isSearchModalOpen && (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${theme === 'light' ? 'bg-light-background bg-opacity-50' : 'bg-dark-primary bg-opacity-50'}`} onClick={() => setIsSearchModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="p-4 bg-opacity-40 backdrop-blur-md border border-transparent focus:border focus:border-indigo-300 rounded-md shadow-2xl">
            <SearchInput isModal={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
