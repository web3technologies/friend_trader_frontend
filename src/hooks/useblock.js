import { useState, useEffect } from "react";
import { urls } from "../settings/urls";

import api from "../settings/api";


export default function useBlock(blockNumber){

    const [ block, setBlock ] = useState({trade_set: []})

    const getData = async () => {

        const url = `/friend-trader/${urls.block}/${blockNumber}/`;
        try {
            const blockData = await api.get(url);
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