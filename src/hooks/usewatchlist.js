import { useState, useEffect } from "react";
import api from "../settings/api";
import { useTheme } from "../context/ThemeContext";


export default function useWatchList(){

    const [ watchList, setWatchList ] = useState([])
    const [ isLoading, setLoading ] = useState(false)
    const { handleSignOut } = useTheme()
    const url = `/friend-trader/watchlist/`;

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


    useEffect(()=>{
        getWatchList()
        return ()=> setWatchList([])
    },[])

    return { watchList, isLoading }
}