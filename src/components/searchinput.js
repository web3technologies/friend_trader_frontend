import { FaSearch } from 'react-icons/fa';
import useFriendTechUserList from "../hooks/usefriendtechuserlist";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';


const SearchInput = ({ isModal }) => { 
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { userList, debounedSearch, setUserList } = useFriendTechUserList()

    const handleNavigate = (navLink)=>{
        navigate(navLink)
        setUserList([])
    }
    
    
    return (
        <div className={`relative ${isModal ? '' : 'w-56 ml-4 hidden md:block'}`}>
        <input
            autoFocus={isModal}
            className={`pl-8 pr-4 py-1 rounded w-full bg-opacity-40 backdrop-blur-md border border-transparent focus:border focus:border-indigo-300 transition-all ${theme === 'light' ? 'bg-white text-gray-800 placeholder-gray-500' : 'bg-black text-white placeholder-gray-300'}`}
            type="text"
            placeholder="Search..."
            onChange={(e)=> debounedSearch(e.target.value)}
        />
        <FaSearch className={`absolute top-1/2 transform -translate-y-1/2 left-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} />
        {
            userList.length > 0 && (
                <div className={`absolute top-full mt-2 w-full bg-white dark:bg-dark-secondary rounded shadow-lg overflow-y-auto max-h-64 ${userList && userList.length > 0 ? 'block' : 'hidden'}`}>
                {userList.map(user => (
                    <div key={user.twitter_username} className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-dark-primary cursor-pointer" onClick={()=>handleNavigate(`/user/${user.twitter_username}`)}>
                        <img src={user.twitter_profile_pic} alt="User Profile" className="w-10 h-10 rounded-full object-cover mr-3" />
                        <div>
                            <h1 className="text-sm text-gray-800 dark:text-light-foreground">{user.twitter_username}</h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Followers: {user.twitter_followers? user.twitter_followers.toLocaleString(): null}</p>
                        </div>
                    </div>
                ))}
            </div>
            )
        }

        </div>
  );
}

export default SearchInput