import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    }
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl">Social Media Application</h1>
            <nav>
                <button className='mx-2 p-2 bg-gray-700 hover:bg-gray-600 rounded'>Home</button>
                <button className='mx-2 p-2 bg-gray-700 hover:bg-gray-600 rounded'>Profile</button>
                <button className='mx-2 p-2 bg-gray-700 hover:bg-gray-600 rounded'>Messages</button>
                <button className='mx-2 p-2 bg-gray-700 hover:bg-gray-600 rounded'>Notifications</button>
                <button
                    onClick={handleLogout}
                    className='mx-2 p-2 bg-red-500 hover:bg-red-400 rounded'
                >
                    Logout
                </button>
            </nav>
        </header>
    );
};

export default Header;
