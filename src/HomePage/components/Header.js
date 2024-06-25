import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const { logout, userId, apiUrl, userToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/home')
    }

    const handleProfile = () => {
        navigate('/profile/' + userId)
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    }

    const handleSearch = async () => {
        navigate('/search?username=' + document.getElementById('search_username').value)
    }

    return (
        <header className="border-b bg-backgroundGrey border-borderGrey text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl">Social Media Platform</h1>
            <nav>
                <input id="search_username" className='bg-gray-800 h-10 rounded p-2' placeholder='Search for users'></input>
                <button
                    onClick={handleSearch}
                    className='mx-2 p-2 bg-gray-700 hover:bg-gray-600 rounded w-10'
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <button
                    onClick={handleHome}
                    className='mx-2 p-2 bg-gray-700 hover:bg-gray-600 rounded'
                >
                    Home
                </button>
                <button
                    onClick={handleProfile}
                    className='mx-2 p-2 bg-gray-700 hover:bg-gray-600 rounded'
                >
                    Profile
                </button>
                <button
                    onClick={handleLogout}
                    className='mx-2 p-2 bg-lightRed transition duration-200 hover:bg-hoverRed rounded'
                >
                    Logout
                </button>
            </nav>
        </header>
    );
};

export default Header;
