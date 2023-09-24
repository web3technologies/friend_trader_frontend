import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header';
import Sidebar from './components/sidebar';

import FriendTechUserDetail from './pages/FriendTechUserDetail';
import DashBoard from './pages/DashBoard';
import BlockDetail from './pages/BlockDetail';
import Block from './pages/Block';
import Home from './pages/Home';
import Trade from './pages/Trade';
import LeaderBoard from './pages/LeaderBoard';

import { useTheme } from './context/ThemeContext';
import RequireAuth from './pages/RequireAuth';

function App() {

    const { user, handleSignIn } = useTheme()

    return (
        <>
            <RequireAuth user={user} handleSignIn={handleSignIn}>
                <BrowserRouter>
                    <Header/>
                    <Sidebar/>
                    <Routes>
                        <Route path={""} element={<Home/>}/>
                        <Route path={"/dashboard"} element={<DashBoard/>}/>
                        <Route path={"/user/:twitterUsername"} element={<FriendTechUserDetail/>}/>
                        <Route path={"/block/:blockNumber"} element={<BlockDetail/>}/>
                        <Route path={"/blocks"} element={<Block/>}/>
                        {/* <Route path={"/leaderboard"} element={<LeaderBoard/>}/> */}
                        <Route path={"/trades"} element={<Trade/>}/>
                    </Routes>
                </BrowserRouter>
            </RequireAuth>
        </>
    )
}

export default App;
