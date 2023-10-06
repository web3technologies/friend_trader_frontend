import React, { useState } from 'react';
import { FaSearch, FaBell, FaUserCircle, FaCog, FaMoon, FaBars, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { Transition } from '@headlessui/react';

import SearchInput from './searchinput';


const Header = () => {
  const { theme, toggleTheme, toggleSidebarOpen, user, handleSignIn, handleSignOut} = useTheme();
  
    const [isDropdownVisible, setDropdownVisibility] = useState(false);
    const [isUserDropDownVisible, setIsUserDropDownVisible] = useState(false);

    const performSignOut = ()=>{
        handleSignOut()
        setDropdownVisibility(false)
        setIsUserDropDownVisible(false)
    }

    const toggleDropdown = () => {
        setDropdownVisibility(!isDropdownVisible);
    }


    const iconClass = hoverBg => {
        return `p-2 rounded-full transition-transform transform hover:scale-105 ${theme === 'light' ? 'hover:bg-gradient-to-r hover:from-blue-300 hover:to-pink-400' : 'hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-500'} ${hoverBg} cursor-pointer`;
    };

    const stickyHeaderStyle = 'sticky top-0 z-50';
    const biggerIconStyle = 'text-2xl';
    

    const notifications = [
        {
          id: 1,
          text: "Coming Soon!",
          link: "/comments",
          icon: "📝"
        },
      ];

  return (
            <div className={`flex justify-between items-center py-2 px-4 shadow-2xl bg-gradient-to-r ${stickyHeaderStyle} ${theme === 'light' ? 'from-white to-gray-100' : 'from-gray-900 to-black'}`}>

            {/* Hamburger Menu */}
            <div onClick={toggleSidebarOpen} className={iconClass('')}>
                <FaBars className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} ${biggerIconStyle}`} />
            </div>

            {/* Desktop Search Component */}
            <SearchInput isModal={false} className="flex-grow mx-4 md:mx-8 hidden md:block" />

            <div className="flex items-center space-x-4">
                <div className="flex space-x-2 items-center">
                    {
                        user ?
                        <>
                            <span className={`${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{`${user.public_address.slice(0, 6)}...${user.public_address.slice(-4)}`}</span>
                            <div onClick={() => setIsUserDropDownVisible(!isUserDropDownVisible)} className={iconClass('')}>
                                <FaUserCircle className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} ${biggerIconStyle}`} />
                            </div>

                            <Transition
                                show={isUserDropDownVisible}
                                enter="transition ease-out duration-200 transform"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="transition ease-in duration-150 transform"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                {(ref) => (
                                    <div 
                                        ref={ref} 
                                        className="origin-top-right absolute right-0 mt-4 w-56 rounded-md shadow-2xl bg-white border border-gray-200 focus:outline-none z-10">
                                        <div className="py-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <button 
                                                onClick={performSignOut} 
                                                className="w-full text-center text-left block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white rounded" 
                                                role="menuitem">
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Transition>
                            <div onClick={toggleDropdown} className={iconClass('relative')}>
                                <FaBell className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} ${biggerIconStyle}`}/>
                                {
                                notifications.length > 0 && 
                                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                                    {notifications.length}
                                </div>
                                }
                                {
                                isDropdownVisible &&
                                <div className="absolute w-64 right-0 mt-2 py-2 bg-white border rounded shadow-xl">
                                    {
                                    notifications.map((notification, index) => (
                                        <div key={index} className="px-4 py-2 hover:bg-gray-100 transition">
                                        {notification.text}
                                        </div>
                                    ))
                                    }
                                </div>
                                }
                            </div>
                        </>
                        :
                        <button className={`flex items-center space-x-2 px-3 py-1 rounded-md ${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-700 text-white'} hover:bg-opacity-90 transition`} onClick={handleSignIn}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png" alt="Metamask" className="w-6 h-6" />
                            <span>Login</span>
                        </button>
                        
                        }
                    
                </div>

                <div className={`rounded-full p-1 transition-transform transform hover:scale-105 ${theme === 'light' ? 'bg-gradient-to-r from-blue-300 to-pink-400' : 'bg-gradient-to-r from-purple-600 to-indigo-500'} cursor-pointer`} onClick={toggleTheme}>
                    {theme === 'light' ? <FaMoon className={`text-dark-primary p-2 rounded-full bg-black ${biggerIconStyle}`} /> : <FaSun className={`text-dark-primary p-2 rounded-full bg-yellow-500 ${biggerIconStyle}`} />}
                </div>
            </div>
            </div>
  );
};

export default Header;
