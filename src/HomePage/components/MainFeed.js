import React from 'react';

const MainFeed = () => {
    return (
        <div className='box-border rounded-10px flex-col flex-grow p-4 bg-borderBoxGrey'>
            <div className='border rounded-10px border-gray-300 p-30px mb-4'>
                <p>Test post 1</p>
            </div>
            <div className='border rounded-10px border-gray-300 p-30px mb-4'>
                <p>Test post 2</p>
            </div>
        </div>
    );
};

export default MainFeed;
