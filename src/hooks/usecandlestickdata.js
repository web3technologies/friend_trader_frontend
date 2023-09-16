import { useState, useRef, useEffect } from "react";
import { createChart } from 'lightweight-charts';
import { RSI } from 'technicalindicators';
import axios from 'axios';

import { baseURL } from "../settings/urls";

export default function useCandleStickData(twitterUsername){
    const chartContainerRef = useRef(null);
    const rsiContainerRef = useRef(null);
    const [ userData, setUserData ] = useState({candle_stick_data: []})
    const [ candleStickInterval, setCandleStickInterval] = useState("14400")


    async function getData(){
      const url = `${baseURL}/friend-trader/friend-tech-user/${twitterUsername}/?interval=${candleStickInterval}`;
      try {
          const userDataRes = await axios.get(url);
          setUserData(userDataRes.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(()=>{
        getData()
    }, [candleStickInterval, twitterUsername])
    
    useEffect(() => {

      const chart = createChart(chartContainerRef.current, {
        width: window.innerWidth * .65,
        height: window.innerHeight * 0.6, 
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

      const rsiChart = createChart(rsiContainerRef.current, {
        width: window.innerWidth * .65,
        height: window.innerHeight * 0.14,  // Taking 20% of 0.7 which was originally used
        timeScale: {
            rightOffset: 50,
            barSpacing: 3,
            borderColor: '#555',
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
        priceScale: {
            autoScale: true,
            borderColor: '#555',
        },
        localization: {
            priceFormatter: function(price) {
                // This ensures that the RSI value is shown as a plain number without extra decimals
                return parseFloat(price).toFixed(2);
            },
        },
    });

      if (userData.candle_stick_data.length > 0) {
            const candlestickSeries = chart.addCandlestickSeries();
            candlestickSeries.setData(userData.candle_stick_data);

            // Calculate and display the RSI
            const closePrices = userData.candle_stick_data.map(candle => candle.close);
            const rsiValues = RSI.calculate({ values: closePrices, period: 14 });
            const rsiSeries = rsiChart.addLineSeries({
                color: 'black',
                lineWidth: 2,
            });
            rsiSeries.setData(
                userData.candle_stick_data.slice(14).map((candle, index) => ({
                    time: candle.time, 
                    value: rsiValues[index]
                }))
            );
            const generateLevelData = (levelValue) => {
                if (userData.candle_stick_data.length === 0) return [];
                const start = userData.candle_stick_data[0].time;
                const end = userData.candle_stick_data[userData.candle_stick_data.length - 1].time;
                return [{ time: start, value: levelValue }, { time: end, value: levelValue }];
            };
            
            // Add overbought line at 70
            const overboughtSeries = rsiChart.addLineSeries({
                color: '#FF0000', // Red color for overbought
                lineWidth: 1,
            });
            overboughtSeries.setData(generateLevelData(70));
            
            // Add oversold line at 30
            const oversoldSeries = rsiChart.addLineSeries({
                color: '#00FF00', // Green color for oversold
                lineWidth: 1,
            });
            oversoldSeries.setData(generateLevelData(30));
            
            
        }

        return () => {
            chart.remove();
            rsiChart.remove();
        }
    }, [userData.candle_stick_data]);


    return {
        chartContainerRef,
        rsiContainerRef,
        userData,
        setCandleStickInterval,
        candleStickInterval
    }

}