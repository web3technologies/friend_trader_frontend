import { useState, useEffect } from "react";
import axios from 'axios';

import { urls, baseURL } from "../settings/urls";


export default function useBlock(blockNumber){

    const [ block, setBlock ] = useState({trade_set: []})

    const getData = async () => {

        const url = `${baseURL}/friend-trader/${urls.block}/${blockNumber}/`;
        try {
            const blockData = await axios.get(url);
            console.log(blockData.data)
            setBlock(blockData.data);
            } catch (e) {
                console.log(e);
        }
    }


    useEffect(() => {
        getData()
      return () => {
        setBlock([])
      }
    }, [])
    

    return { block }
}