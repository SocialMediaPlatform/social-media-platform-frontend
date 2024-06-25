import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../AuthContext";
import Header from './components/Header';
import MainFeed from './components/MainFeed';
import Conversations from './components/Conversations';

const HomePage = () => {
    return (
        <div className='flex flex-col h-screen overflow-hidden'>
            <Header />
            <div className='bg-backgroundGrey flex flex-1 justify-center items-stretch'>
                <MainFeed />
                <Conversations />
            </div>
        </div>
    );
};

export default HomePage;

