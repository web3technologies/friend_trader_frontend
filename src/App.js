import React, { useRef, useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { RSI } from 'technicalindicators';
import axios from 'axios';
import "./test.css"

function App() {
    const chartContainerRef = useRef(null);

    const [ userData, setUserData ] = useState({candle_stick_data: []})

    useEffect(() => {

        async function getData(){
            const url = "http://localhost:8000/friend-trader/friend-tech-users/0xrelativity/?interval=300";
            try {
                const userDataRes = await axios.get(url);
                console.log(userDataRes)
                setUserData(userDataRes.data);
            } catch (e) {
                console.log(e);
            }
        }
    
        getData();
    
    }, []);
    
    useEffect(() => {
      const chart = createChart(chartContainerRef.current, {
          width: 600,
          height: 650,
          timeScale: {
              rightOffset: 12,
              barSpacing: 3,
              fixLeftEdge: true,
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
      <div className="main-centering-container">
    <div className="profile-container">
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img 
                src={userData.twitter_profile_pic} 
                alt="User Profile" 
                className="profile-image"
            />
            <div style={{marginLeft: "8px"}}>
              <h1>{userData.twitter_username}</h1>
              <p>ShareSupply: {userData.shares_supply}</p>
            </div>
            
        </div>
        <div ref={chartContainerRef} className="chart-container">
            {/* Chart content here */}
        </div>
    </div>
</div>
    )
}

export default App;
