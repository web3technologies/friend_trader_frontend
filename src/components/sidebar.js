import { FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import LoginComponent from './login';
import Logo from './logo';


const Sidebar = () => {
  const { theme, isSidebarOpen, toggleSidebarOpen, user } = useTheme();
  const navigate = useNavigate();

  const linkClass = () => {
    return `block px-4 py-2 cursor-pointer rounded-lg transition-transform transform hover:scale-105 ${theme === 'light' ? 'hover:bg-gradient-to-r hover:from-blue-300 hover:to-pink-400 text-gray-800' : 'hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-500 text-white'} hover:text-white`;
  };

  return (
    <div className={`fixed top-0 left-0 h-full transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 z-50 shadow-2xl bg-gradient-to-r ${theme === 'light' ? 'from-white to-gray-100' : 'from-gray-900 to-black'}`}>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className={`fixed top-0 left-0 h-full transition-transform ease-out duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 z-50 shadow-2xl bg-gradient-to-r ${theme === 'light' ? 'from-white to-gray-100' : 'from-gray-900 to-black'}`}>
          
          {/* Close Button */}
          <div className="p-4 flex justify-between items-center md:justify-end">
            <div className='md:hidden'>
              <Logo/>
            </div>
            <div className={`p-2 rounded-full transition-transform transform hover:scale-105 ${theme === 'light' ? 'hover:bg-gradient-to-r hover:from-blue-300 hover:to-pink-400' : 'hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-500'} cursor-pointer`}>
              <FaTimes className={theme === 'light' ? 'text-gray-800' : 'text-white'} onClick={toggleSidebarOpen} />
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-4 p-4">
            <li><a className={linkClass()} onClick={()=>navigate("")}>Home</a></li>
            <li><a className={linkClass()} onClick={()=>navigate("metrics")}>Metrics</a></li>
            <li><a className={linkClass()} onClick={()=>navigate("watchlist")}>WatchList</a></li>
            
          </ul>
          <div className={"p-4 md:hidden"}>
            <LoginComponent extraStyles={"w-full flex justify-center md:hidden"}/>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Sidebar;
