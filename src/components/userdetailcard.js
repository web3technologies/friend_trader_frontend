import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy, FaStar } from 'react-icons/fa';


const UserDetailCard = ({ userData, extraStyles, toggleFavorite }) => {


    if (userData) {
        return (
            <div className={`max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden ${extraStyles} group`}>
                {userData.twitter_profile_banner && (
                    <div 
                        className="w-full h-24 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${userData.twitter_profile_banner})` }}
                    ></div>
                )}
                <div className="p-4 space-y-6">
                    <div className="flex items-center justify-between">
                        <img 
                            src={userData.twitter_profile_pic} 
                            alt="User Profile" 
                            className="w-16 h-16 rounded-full object-cover shadow-lg"
                        />
                        <div className="flex-1 ml-4">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl text-gray-800 dark:text-light-foreground font-semibold mb-2">{userData.twitter_username}</h1>
                                <div className="flex items-center">
                                    <FaStar
                                        onClick={()=>toggleFavorite(userData)}
                                        className={`cursor-pointer transform transition-transform duration-300 ${userData.is_watched ? 'text-yellow-400' : 'text-gray-400'} hover:scale-110`}
                                    />
                                </div>
                            </div>
                            {userData.address && (
                                <div className="flex items-center">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Address: {`${userData.address.slice(0, 6)}...${userData.address.slice(-4)}`}
                                    </p>
                                    <CopyToClipboard text={userData.address}>
                                        <FaCopy className='cursor-pointer ml-4'/>
                                    </CopyToClipboard>
                                </div>
                            )}
                            
                            <p className="text-gray-500 dark:text-gray-400">ShareSupply: {userData.shares_supply}</p>
                            <p className="text-gray-500 dark:text-gray-400">Followers: {userData.twitter_followers ? userData.twitter_followers.toLocaleString() : null}</p>
                        </div>
                    </div>
                    {userData.verified &&
                        <div className="text-xs bg-blue-500 text-white rounded-full px-2 py-1 self-start mb-4">Verified</div>
                    }
    
                    <div>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                            Latest price: Ξ{userData.latest_price}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                            Holders: {userData.holder_count ? userData.holder_count.toLocaleString() : 0}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                            Holdings: {userData.holding_count ? userData.holding_count.toLocaleString() : 0}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                            Last Online: {new Date(userData.last_online).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDetailCard;
