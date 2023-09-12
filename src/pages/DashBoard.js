import React from 'react'

import TradeTable from '../components/tradetable'
import { useTheme } from '../context/ThemeContext'

function DashBoard() {

  const { theme } = useTheme()

  return (
    <div className={`flex items-start justify-between h-screen px-6 py-4 ${theme === 'light' ? 'bg-gray-100' : 'bg-dark-primary'}`}>
      <div></div>
      <TradeTable/>
    </div>
  )
}

export default DashBoard