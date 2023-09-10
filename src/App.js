import React from 'react';

import useCandleStickData from './hooks/usecandlestickdata';


function App() {
    
    const {
        chartContainerRef,
        rsiContainerRef,
        userData,
        getData,
        setSearchState,
        handleDropdownChange
    } = useCandleStickData()

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between",  backgroundColor: "#f5f5f5", height: "100vh"}}>
            <div>
                <div ref={chartContainerRef}>
                    {/* Chart will be rendered here */}
                </div>
                <div ref={rsiContainerRef} style={{ height: '20%' }}>
                    {/* RSI will be rendered here */}
                </div>
            </div>
            <div>
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
            </div>
        </div>
    )
}

export default App;
