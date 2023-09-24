import { FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { theme, isSidebarOpen, toggleSidebarOpen } = useTheme();
  const navigate = useNavigate();

  const linkClass = () => {
    return `block px-4 py-2 cursor-pointer rounded-lg transition-transform transform hover:scale-105 ${theme === 'light' ? 'hover:bg-gradient-to-r hover:from-blue-300 hover:to-pink-400 text-gray-800' : 'hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-500 text-white'} hover:text-white`;
  };

  return (
    <div>
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className={`fixed top-0 left-0 h-full transition-transform transform translate-x-0 w-64 z-50 shadow-2xl bg-gradient-to-r ${theme === 'light' ? 'from-white to-gray-100' : 'from-gray-900 to-black'}`}>
          
          {/* Close Button */}
          <div className="p-4 flex justify-end">
            <div className={`p-2 rounded-full transition-transform transform hover:scale-105 ${theme === 'light' ? 'hover:bg-gradient-to-r hover:from-blue-300 hover:to-pink-400' : 'hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-500'} cursor-pointer`}>
            <FaTimes className={theme === 'light' ? 'text-gray-800' : 'text-white'} onClick={toggleSidebarOpen} />
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-4 p-4">
            <li><a className={linkClass()} onClick={()=>navigate("")}>Home</a></li>
            <li><a className={linkClass()} onClick={()=>navigate("dashboard")}>Dashboard</a></li>
            <li><a className={linkClass()} onClick={()=>navigate("leaderboard")}>LeaderBoard</a></li>
            <li><a className={linkClass()} onClick={()=>navigate("trades")}>Trades</a></li>
            <li><a className={linkClass()} onClick={()=>navigate("blocks")}>Blocks</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
