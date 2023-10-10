import { useState, useRef, useEffect } from 'react'
import { createChart } from 'lightweight-charts';
import api from '../settings/api';


function VolumeChart() {
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
        if (volume && volumeContainerRef.current) {
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

            volumeSeries.setData(volume);
        }

        return () => {
            if (chart) {
                chart.remove();
            }
        };

    }, [volume]);

    const buttonBaseClasses = "py-1 px-3 rounded shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50";
    const activeButtonClasses = "bg-blue-700 text-white border border-blue-600";
    const inactiveButtonClasses = "bg-gray-700 text-white hover:bg-gray-800 active:bg-gray-900 focus:ring-gray-700";

    return (
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-medium text-white">Trade Volume(Ξ)</h2>
                <div className="space-x-2">
                    {['month', 'week', 'day'].map(p => (
                        <button 
                            key={p}
                            onClick={() => setPeriod(p)} 
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
                    {/* Chart goes here */}
                </div>
            }
        </div>
    )
}

export default VolumeChart