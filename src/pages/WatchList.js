import React from 'react'
import { useTheme } from '../context/ThemeContext'
import Login from './Login';


function WatchList() {

    const { user, handleSignIn } = useTheme()

    if (!user) {
        return <Login handleSignIn={handleSignIn}/>;
     }
    return (
        <div>WatchList</div>
    )
}

export default WatchList