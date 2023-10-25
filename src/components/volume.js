import { useState, useRef, useEffect } from 'react'
import { createChart } from 'lightweight-charts';
import api from '../settings/api';
import useWindowSize from '../hooks/usewindowsize';

function VolumeChart() {
    const {width, height} = useWindowSize();
    const [volume, setVolume] = useState(null);
    const [period, setPeriod] = useState("day");
    const [loading, setLoading] = useState(false); 
    const volumeContainerRef = useRef(null);
    let chart;
    let volumeSeries;

    async function getData() {
        setLoading(true);  // Set loading to true when fetching starts
        try {
            let res = await api.get(`friend-trader/volume/?period=${period}`);
            setVolume(res.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);  // Set loading to false when fetching completes
        }
    }

    useEffect(() => {
        getData();
    }, [period]);

    useEffect(() => {

        const isMobile = window.innerWidth <= 768;

        if (volume && volumeContainerRef.current) {
            chart = createChart(volumeContainerRef.current, {
                width: window.innerWidth * (isMobile ? .65 : .40),
                height: window.innerHeight * 0.60,
                timeScale: {
                    rightOffset: isMobile ? 2 : 1,
                    barSpacing: isMobile ? 3 : 15
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

            volumeSeries.setData(volume);
        }

        return () => {
            if (chart) {
                chart.remove();
            }
        };

    }, [volume]);


    const changePeriod = (p) => {
        setVolume(null)
        setPeriod(p)
    }

    const buttonBaseClasses = 'py-2 px-4 rounded focus:outline-none';
    const activeButtonClasses = 'bg-blue-500 text-white';
    const inactiveButtonClasses = 'bg-gray-700 text-gray-300';

    return (
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-medium text-white">Trade Volume(Ξ)</h2>
          <div className="space-x-2 mt-4 md:mt-0">
            {['month', 'week', 'day'].map(p => (
              <button 
                key={p}
                onClick={() => changePeriod(p)} 
                className={`${buttonBaseClasses} ${p === period ? activeButtonClasses : inactiveButtonClasses}`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {loading ? 
          <div className="flex justify-center items-center space-x-4 mt-4">
            <div className="border-t-4 border-gray-600 w-16 h-16 rounded-full animate-spin"></div>
            <p className="text-gray-400 text-lg">Loading...</p>
          </div> 
          : !volume ?
          <div className="flex justify-center items-center mt-4">
            <p className="text-gray-400 text-lg">No data available.</p>
          </div>
          :
          <div ref={volumeContainerRef} className="border bg-gray-800 border-gray-700 rounded p-2 shadow-lg">
            {/* Chart goes here with width={chartWidth} and height={chartHeight} */}
          </div>
        }
      </div>
    )
}

export default VolumeChart