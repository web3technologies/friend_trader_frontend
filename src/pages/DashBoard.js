import React from 'react'

import TradeTable from '../components/tradetable'
import { useTheme } from '../context/ThemeContext'
import VolumeChart from '../components/volume'


function DashBoard() {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col md:flex-row items-start justify-between min-h-screen px-6 py-4 ${theme === 'light' ? 'bg-gray-100' : 'bg-dark-primary'}`}>
      <div className="w-full md:w-auto mb-4 md:mb-0">
        <VolumeChart/>
      </div>

      <TradeTable/>
      
    </div>
  )
}

export default DashBoard;
