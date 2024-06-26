import React, { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

//Commented sections should be valid cookie handling implementation
//I had to mock the data so I could test if routing works 
export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const navigate = useNavigate();
    const location = useLocation();

    const apiUrl = 'http://localhost:6868';


    useEffect(() => {
        const currentPath = location.pathname;
        if (!userToken && !['/login', '/register', '/register/reset-password'].includes(currentPath)) {
            navigate('/login');
        }
    }, [userToken, navigate]);

    const login = async (email, password) => {
        try {
            const response = await fetch(apiUrl + '/api/v1/auth/authenticate', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               credentials: 'include',
               body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) {
               throw new Error('Login failed: ' + response.status);
            }
            
            const data = await response.json();

            setUserToken(data.token);
            localStorage.setItem('userToken', data.token)
            const id = JSON.parse(atob(data.token.split('.')[1]))['userId'];
            setUserId(id);
            localStorage.setItem('userId', id);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await fetch(apiUrl + '/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({username, email, password})
            
            });
            
            if (!response.ok) {
                throw new Error('Registration failed: ' + response.status);
            }
            
            const data = await response.json();

            setUserToken(data.token);
            localStorage.setItem('userToken', data.token)
            const id = JSON.parse(atob(data.token.split('.')[1]))['userId'];
            setUserId(id);
            localStorage.setItem('userId', id);
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    };

    const resetPassword = async (password, token) => {
        try {
            const response = await fetch(apiUrl + '/api/v1/auth/reset-password', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               credentials: 'include',
               body: JSON.stringify({password, token})
            
            });
            
            if (!response.ok) {
               throw new Error('Password reset failed');
            }

        } catch (error) {
            console.error('Password reset error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            localStorage.clear();
            setUserToken(null);
            setUserId(null);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ userToken, userId, apiUrl, login, register, resetPassword, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
