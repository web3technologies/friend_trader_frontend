import { useState, useEffect } from "react";
import api from "../settings/api";



export default function useTradeList(address){

    const [ trades, setTrades ] = useState([])

    const getTrades = async () => {

        const url = `/friend-trader/trades/${address}/`;
        try {
            const userDataRes = await api.get(url);
            setTrades(userDataRes.data);
            } catch (e) {
                console.log(e);
        }
    }

    useEffect(()=>{

        getTrades()

        return ()=> setTrades([])

    },[address])

    return { trades }
}