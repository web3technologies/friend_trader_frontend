import { useState, useEffect } from "react";
import axios from 'axios';

import { baseURL } from "../settings/urls";

export default function useTradeList(address){

    const [ trades, setTrades ] = useState([])

    const getTrades = async () => {

        const url = `${baseURL}/friend-trader/trades/${address}/`;
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