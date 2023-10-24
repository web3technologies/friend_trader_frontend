import { useState, useEffect } from "react";
import api from "../settings/api";
import { useTheme } from "../context/ThemeContext";


export default function useWatchList(){

    const [ watchList, setWatchList ] = useState([])
    const [ isLoading, setLoading ] = useState(false)
    const { handleSignOut } = useTheme()
    const url = `/friend-trader/watchlist/`;

    console.log(watchList)

    const getWatchList = async () => {

        setLoading(true)
        try {
            const watchListRes = await api.get(url);
            setWatchList(watchListRes.data);
            setLoading(false)
            } catch (e) {
                handleSignOut()
                setLoading(false)
        }
    }

    const toggleFavorite = async (subject) => {
        try{
            console.log(subject)
            const watchRes = await api.delete(`/friend-trader/watchlist/remove-watch/`, {data: {friend_tech_user_id: subject.id}})
            setWatchList(prevWatchList =>{
                return prevWatchList.filter(currSubject => currSubject.friend_tech_user.id !== subject.id)
            })
            
        }
        catch (e){
          console.log(e)
      }
      };
  


    useEffect(()=>{
        getWatchList()
        return ()=> setWatchList([])
    },[])

    return { watchList, isLoading, toggleFavorite }
}