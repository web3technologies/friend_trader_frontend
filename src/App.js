import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Header from './components/header';
import Footer from './components/footer';
import Sidebar from './components/sidebar';

import FriendTechUserDetail from './pages/FriendTechUserDetail';
import DashBoard from './pages/DashBoard';
import BlockDetail from './pages/BlockDetail';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import WatchList from './pages/WatchList';


function App() {
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Sidebar/>
                <Routes>
                    <Route path={""} element={<Home/>}/>
                    <Route path={"/dashboard"} element={<DashBoard/>}/>
                    <Route path={"/watchlist"} element={<WatchList/>}/>
                    <Route path={"/user/:twitterUsername"} element={<FriendTechUserDetail/>}/>
                    <Route path={"/block/:blockNumber"} element={<BlockDetail/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    )
}

export default App;
