import React, { useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import { RSI } from 'technicalindicators';


const dummyData = [
  { time: '2023-01-01', open: 100, high: 105, low: 97, close: 103 },
  { time: '2023-01-02', open: 103, high: 110, low: 100, close: 108 },
  { time: '2023-01-03', open: 108, high: 115, low: 105, close: 112 },
  { time: '2023-01-04', open: 113, high: 120, low: 111, close: 119 },
  { time: '2023-01-05', open: 118, high: 124, low: 115, close: 123 },
  { time: '2023-01-06', open: 123, high: 130, low: 120, close: 127 },
  { time: '2023-01-07', open: 127, high: 133, low: 124, close: 132 },
  { time: '2023-01-08', open: 132, high: 135, low: 129, close: 134 },
  { time: '2023-01-09', open: 134, high: 138, low: 131, close: 136 },
  { time: '2023-01-10', open: 137, high: 142, low: 134, close: 140 },
  { time: '2023-01-11', open: 140, high: 144, low: 137, close: 142 },
  { time: '2023-01-12', open: 143, high: 147, low: 139, close: 145 },
  { time: '2023-01-13', open: 145, high: 150, low: 143, close: 148 },
  { time: '2023-01-14', open: 148, high: 152, low: 145, close: 150 },
  { time: '2023-01-15', open: 151, high: 154, low: 147, close: 153 },
  { time: '2023-01-16', open: 153, high: 157, low: 150, close: 155 },
  { time: '2023-01-17', open: 156, high: 160, low: 152, close: 158 },
  { time: '2023-01-18', open: 158, high: 162, low: 154, close: 160 },
  { time: '2023-01-19', open: 161, high: 165, low: 157, close: 130 },
  { time: '2023-01-20', open: 164, high: 168, low: 160, close: 90 },
  { time: '2023-01-21', open: 90, high: 170, low: 163, close: 115 },
  { time: '2023-01-22', open: 115, high: 173, low: 165, close: 120 },
  { time: '2023-01-23', open: 120, high: 176, low: 168, close: 100 },
  { time: '2023-01-24', open: 100, high: 178, low: 170, close: 94.3 },
  { time: '2023-01-25', open: 177, high: 180, low: 173, close: 178 },
  { time: '2023-01-26', open: 179, high: 182, low: 175, close: 180 },
  { time: '2023-01-27', open: 181, high: 184, low: 177, close: 183 },
  { time: '2023-01-28', open: 184, high: 186, low: 179, close: 185 },
  { time: '2023-01-29', open: 186, high: 188, low: 181, close: 187 },
  { time: '2023-01-30', open: 188, high: 190, low: 183, close: 189 },
  { time: '2023-01-31', open: 190, high: 192, low: 185, close: 191 }
];

function App() {
    const chartContainerRef = useRef();
    useEffect(() => {
      const chart = createChart(chartContainerRef.current, { width: 1200, height: 800 });
      const candlestickSeries = chart.addCandlestickSeries();
      candlestickSeries.setData(dummyData);
  
      const rsiValues = RSI.calculate({
          values: dummyData.map(d => d.close), // Assuming data is an array of {time, open, high, low, close}
          period: 14 // This is a common period for RSI. Adjust as needed.
      });
      
      const rsiData = rsiValues.map((value, index) => ({
          time: dummyData[index + 13].time, // Offset by period-1 (14-1=13)
          value
      }));
      
      const rsiSeries = chart.addLineSeries();
      rsiSeries.setData(rsiData);
  
      return () => chart.remove();
  }, [dummyData]);

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center" , marginTop: "40px"}}>
          <div ref={chartContainerRef}>
          </div>;
        </div>
    )
}

export default App;
