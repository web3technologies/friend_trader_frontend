import React, { useRef, useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { RSI } from 'technicalindicators';
import axios from 'axios';
import "./test.css"

function App() {
    const chartContainerRef = useRef(null);

    const [ userData, setUserData ] = useState({candle_stick_data: []})
    const [ searchState, setSearchState ] = useState(null)
    const [ interval, setInterval ] = useState(300)

    const handleDropdownChange = (e) => {
      setInterval(e.target.value);
  }

    async function getData(){
      const url = `http://localhost:8000/friend-trader/friend-tech-users/${searchState}/?interval=${interval}`;
      try {
          const userDataRes = await axios.get(url);
          console.log(userDataRes)
          setUserData(userDataRes.data);
        } catch (e) {
            console.log(e);
        }
    }
    
    useEffect(() => {
      const chart = createChart(chartContainerRef.current, {
        width: window.innerWidth * .65,
        height: window.innerHeight * 0.7, 
          timeScale: {
              rightOffset: 50,
              barSpacing: 3,
              // fixLeftEdge: true,
          },
          layout: {
              backgroundColor: '#ffffff',
              textColor: '#333',
          },
          grid: {
              vertLines: {
                  color: '#efefef',
              },
              horzLines: {
                  color: '#efefef',
              },
          },
      });
  
        if (userData.candle_stick_data.length > 0) {
            
            const candlestickSeries = chart.addCandlestickSeries();
            candlestickSeries.setData(userData.candle_stick_data);
        }
        
        return () => chart.remove();
    }, [userData.candle_stick_data]);

    return (
<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f5f5f5", position: "relative" }}>

    

    <div style={{ maxWidth: "500px", width: "100%", backgroundColor: "#ffffff", borderRadius: "8px", padding: "16px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", zIndex: 10, marginBottom: "10px" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", borderBottom: "1px solid #e0e0e0", paddingBottom: "16px" }}>
            <img 
                src={userData.twitter_profile_pic} 
                alt="User Profile" 
                style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover", marginRight: "8px" }}
            />
            <div>
                <h1 style={{ margin: 0, fontSize: "20px", color: "#333" }}>{userData.twitter_username}</h1>
                <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#888" }}>ShareSupply: {userData.shares_supply}</p>
                <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#888" }}>Followers: {userData.twitter_followers ? userData.twitter_followers.toLocaleString() : null}</p>
            </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
            <select 
                style={{ flex: 1, marginRight: "8px", padding: "4px 8px", borderRadius: "4px", border: "1px solid #e0e0e0", fontSize: "14px" }} 
                onChange={handleDropdownChange}
            >
                <option value="300">5 minutes</option>
                <option value="3600">1 hour</option>
                <option value="14400">4 hours</option>
            </select>

            <input 
                style={{ flex: 2, marginRight: "8px", padding: "4px 8px", borderRadius: "4px", border: "1px solid #e0e0e0", fontSize: "14px" }}
                onChange={(e) => setSearchState(e.target.value)}
            />

            <button 
                style={{ padding: "4px 16px", backgroundColor: "#007BFF", color: "#fff", borderRadius: "4px", border: "none", cursor: "pointer" }}
                onClick={getData}
            >
                Search
            </button>
        </div>

        <p style={{ marginTop: "12px", fontSize: "14px", color: "#444" }}>
            Current price {userData.candle_stick_data.length > 0 ? userData.candle_stick_data[userData.candle_stick_data.length-1].low : null}
        </p>
    </div>

    <div ref={chartContainerRef}>
        {/* Chart will be rendered here */}
    </div>
</div>
    )
}

export default App;
