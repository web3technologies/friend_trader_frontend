import { useState, useEffect } from "react";
import axios from 'axios';


export default function useTradeList(address){

    const [ trades, setTrades ] = useState([])

    const getTrades = async () => {

        const url = `http://localhost:8000/friend-trader/trades/${address}/`;
        try {
            const userDataRes = await axios.get(url);
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