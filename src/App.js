import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header';
import Sidebar from './components/sidebar';

import FriendTechUserDetail from './pages/FriendTechUserDetail';
import DashBoard from './pages/DashBoard';
import BlockDetail from './pages/BlockDetail';
import Block from './pages/Block';
import Trade from './pages/Trade';

function App() {

    return (
        <>
            <BrowserRouter>
                <Header/>
                <Sidebar/>
                <Routes>
                    <Route path={""} element={<DashBoard/>}/>
                    <Route path={"/user/:twitterUsername"} element={<FriendTechUserDetail/>}/>
                    <Route path={"/block/:blockNumber"} element={<BlockDetail/>}/>
                    <Route path={"/blocks"} element={<Block/>}/>
                    <Route path={"/trades"} element={<Trade/>}/>
                </Routes>
                
            </BrowserRouter>
        </>
    )
}

export default App;
