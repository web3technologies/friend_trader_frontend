import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header';
import Sidebar from './components/sidebar';

import FriendTechUserDetail from './pages/FriendTechUserDetail';
import DashBoard from './pages/DashBoard';
import BlockDetail from './pages/BlockDetail';


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
                </Routes>
                
            </BrowserRouter>
        </>
    )
}

export default App;
