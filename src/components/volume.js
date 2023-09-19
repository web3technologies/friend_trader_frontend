import { useState, useRef, useEffect } from 'react'
import { createChart } from 'lightweight-charts';
import api from '../settings/api';


function VolumeChart() {


    const [ volume, setVolume ] = useState(null)
    const [ period, setPeriod ] = useState("day")

    const volumeContainerRef = useRef(null);
    let chart;
    let volumeSeries;

    async function getData(){
        try{
            let res = await api.get(`friend-trader/volume/?period=${period}`)
            setVolume(res.data)
        } catch (e){
            console.log(e)
        }

    }

    useEffect(() => {
        getData()
    },[period])

    useEffect(() => {

        if (volume){
            if (volumeContainerRef.current) {
                chart = createChart(volumeContainerRef.current, {
                    width: window.innerWidth * .45,
                    height: window.innerHeight * 0.60,
                    timeScale: {
                        rightOffset: 10,
                        barSpacing: 20
                    }
                });
    
                volumeSeries = chart.addHistogramSeries({
                    color: '#26a69a',
                    lineWidth: 2,
                    priceFormat: {
                        type: 'volume',
                    },
                    overlay: true,
                });
    
                // Initially, let's set the weekly data
                volumeSeries.setData(volume);
            }
        }
        return () => {
            if (chart) {
                chart.remove();
            }
        };

    }, [volume]); // The empty dependency array ensures this useEffect runs once after initial render

  return (
    <div className="p-4">
        <div className="flex justify-between items-center mb-4">
            {/* Title */}
            <h2 className="text-2xl font-semibold">Trade Volume(Ξ)</h2>

            {/* Buttons */}
            <div className="space-x-2">
                <button 
                    onClick={() => setPeriod("month")} 
                    className="bg-blue-600 text-white py-1 px-3 rounded shadow hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                    Monthly
                </button>
                <button 
                    onClick={() => setPeriod("week")} 
                    className="bg-blue-600 text-white py-1 px-3 rounded shadow hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                    Weekly
                </button>
                <button 
                    onClick={() => setPeriod("day")} 
                    className="bg-blue-600 text-white py-1 px-3 rounded shadow hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                    Daily
                </button>
            </div>
        </div>

        {
            !volume ?
            <div className="flex justify-center items-center">
                <div className="border-t-4 border-blue-600 w-16 h-16 rounded-full animate-spin-slow"></div>
                <p className="ml-4">Loading...</p>
            </div>
            : 
            <div ref={volumeContainerRef} className="border rounded p-2 shadow-lg">
                {/* Chart goes here */}
            </div>
        }
        
    </div>
  )
}

export default VolumeChart