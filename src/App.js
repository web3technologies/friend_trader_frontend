import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header';
import Sidebar from './components/sidebar';

import FriendTechUserDetail from './pages/FriendTechUserDetail';
import DashBoard from './pages/DashBoard';



function App() {

    return (
        <>
            <BrowserRouter>
                <Header/>
                <Sidebar/>
                <Routes>
                    <Route path={""} element={<DashBoard/>}/>
                    <Route path={"/user/:twitterUsername"} element={<FriendTechUserDetail/>}/>
                </Routes>
                
            </BrowserRouter>
        </>
    )
}

export default App;
