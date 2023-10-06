import React from 'react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';


const Footer = () => {
    const { theme } = useTheme();
    const iconSize = 'text-2xl';

    return (
        <div className={`bg-gradient-to-r ${theme === 'light' ? 'from-white to-gray-100' : 'from-gray-900 to-black'} py-4`}>
            <div className="container mx-auto px-4">
                
                {/* Social Media Section */}
                <div className="flex justify-center space-x-8 items-center">
                    <a href="https://discord.com/channels/1145498878280486912/1145498878829920259" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                        <FaDiscord className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} ${iconSize}`} />
                    </a>
                    <a href="https://twitter.com/FriendTrad3r" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
                        <FaTwitter className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} ${iconSize}`} />
                    </a>
                </div>

                {/* Copyright (optional) */}
                <div className="text-center mt-4">
                    <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} text-sm`}>© 2023 Web3Technologies LLC. All rights reserved.</span>
                </div>

            </div>
        </div>
    );
};


export default Footer;
