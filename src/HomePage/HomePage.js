import React from 'react';
import Header from './components/Header'
import MainFeed from './components/MainFeed';

const HomePage = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='bg-backgroundGrey flex flex-1 justify-center items-stretch'>
                <MainFeed />
            </div>
        </div>
    );
};

export default HomePage;

