import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

//Commented sections should be valid cookie handling implementation
//I had to mock the data so I could test if routing works 
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                //const response = await fetch('/api/auth/me', {
                //    credentials: 'include'
                //});
                //const data = await response.json();
                //if (data) {
                //    setUser(data);
                //}
                const mockUser = {
                    username: "testuser"
                }
                setUser(mockUser);
            } catch (error) {
                setUser(null);
            }
        };

        checkUserLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            //const response = await fetch('/api/auth/login', {
            //    method: 'POST',
            //    headers: {
            //        'Content-Type': 'application/json'
            //    },
            //    credentials: 'include',
            //    body: JSON.stringify({ username, password })
            //});
            //
            //if (!response.ok) {
            //    throw new Error('Login failed');
            //}
            //
            //const data = await response.json();

            const mockUser = {
                email: email
            }
            setUser(mockUser);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (username, email, password) => {
        try {
            //const response = await fetch('api/auth/register', {
            //    method: 'POST',
            //    headers: {
            //        'Content-Type': 'application/json'
            //    },
            //    credentials: 'include',
            //    body: JSON.stringify({username, password})
            //
            //});
            //
            //if (!response.ok) {
            //    throw new Error('Logout failed');
            //}
            //
            //const data = await response.json();

            const mockUser = {
                username: username,
                email: email,
                password: password
            }
            setUser(mockUser);
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
        //    const response = await fetch('/api/auth/logout', {
        //        method: 'POST',
        //        credentials: 'include'
        //});
        //
        //if (!response.ok) {
        //    throw new Error('Logout failed');
        //}

            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
