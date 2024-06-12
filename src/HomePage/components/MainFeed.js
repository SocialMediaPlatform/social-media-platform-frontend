import React from 'react';

const MainFeed = () => {
    return (
        <div className='box-border border border-t-backgroundGrey border-borderGrey flex-col flex-grow max-w-2xl bg-backgroundGrey'>
            <div className='border-b border-borderGrey p-4'></div>
            <div className='border-b border-borderGrey p-4'>
                <p className='text-white'>Test post 1</p>
            </div>
            <div className='border-b border-borderGrey p-4'>
                <p className='text-white'>Test post 2</p>
            </div>
        </div>
    );
};

export default MainFeed;
