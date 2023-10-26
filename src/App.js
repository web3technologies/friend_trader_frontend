import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import Sidebar from './components/sidebar';

import FriendTechUserDetail from './pages/FriendTechUserDetail';
import Metrics from './pages/Metrics';
import BlockDetail from './pages/BlockDetail';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import WatchList from './pages/WatchList';
import Login from './pages/Login';
import { useTheme } from './context/ThemeContext';

function App() {

    const { showLogin } = useTheme()
    
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Sidebar/>
                <Routes>
                    <Route path={""} element={<Home/>}/>
                    <Route path={"/metrics"} element={<Metrics/>}/>
                    <Route path={"/watchlist"} element={<WatchList/>}/>
                    <Route path={"/user/:twitterUsername"} element={<FriendTechUserDetail/>}/>
                    <Route path={"/block/:blockNumber"} element={<BlockDetail/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
                <Footer/>
                {showLogin && <Login />}
            </BrowserRouter>
        </>
    )
}

export default App;
