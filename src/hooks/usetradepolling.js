import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { baseURL } from '../settings/urls';

const url = `${baseURL}/friend-trader/trade/`;


function useTradePolling( interval = 10000) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const lastActivityRef = useRef(new Date().getTime());
    const pollingIntervalRef = useRef(null);
    const inactivityCheckIntervalRef = useRef(null);

    async function getData(){
        try {
            const userDataRes = await axios.get(url);
            setData(prevTrades => {
                let tradesToAdd = []
                for (let i = 0; i < userDataRes.data.length; i++){
                    let currentHash = userDataRes.data[i].hash;
                    let hashExists = false;
                    for (let j = 0; j < prevTrades.length; j++){
                        if (currentHash === prevTrades[j].hash){
                            hashExists = true;
                            break;
                        }
                    }
                    if(!hashExists){
                        tradesToAdd.push(userDataRes.data[i])
                    }
                    
                }
                return [...tradesToAdd, ...prevTrades]
            })
            setLoading(false);
        } catch (e) {
            console.log(e);
            setError(e);
            setLoading(false);
        }
    }

    const startPolling = () => {
        if (!pollingIntervalRef.current) {
            getData();
            pollingIntervalRef.current = setInterval(() => {
                getData();
            }, interval);
        }
    };

    const stopPolling = () => {
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
        }
    };

    useEffect(() => {
        const updateActivity = () => {
            lastActivityRef.current = new Date().getTime();
            if (!pollingIntervalRef.current) {
                startPolling();
            }
        };

        const checkInactivity = () => {
            if (new Date().getTime() - lastActivityRef.current > 30000) {
                stopPolling();
            }
        };

        window.addEventListener('mousemove', updateActivity);
        window.addEventListener('keydown', updateActivity);
        
        startPolling();
        inactivityCheckIntervalRef.current = setInterval(checkInactivity, 5000); // Check every 5 seconds

        return () => {
            stopPolling();
            clearInterval(inactivityCheckIntervalRef.current);
            window.removeEventListener('mousemove', updateActivity);
            window.removeEventListener('keydown', updateActivity);
        };
    }, [url, interval]);

    return { data, loading, error };
}

export default useTradePolling;