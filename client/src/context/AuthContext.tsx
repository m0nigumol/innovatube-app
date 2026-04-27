/* 
THIS FILE HAS THE CONTEXT FOR THE AUTHENTICATION
OF THE PROTECTED ROUTES AND HELP THE USER TO BE LOGGED
*/

import { createContext, useState, useContext } from 'react';

// INTERFACE DECLARATION FOR CONTEXT 
interface AuthContextType {
    user: any;
    login: (token: string, userData: any) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

// CREATE CONTEXT
const AuthContext = createContext<AuthContextType>(null!);

// PROVIDER COMPONENT
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // STATE DECLARATION
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    // ADD LOGIN METHOD
    const login = (newToken: string, userData: any) => {
        // SAVE TOKEN AND USER IN LOCAL STORAGE
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        // UPDATE STATE
        setToken(newToken);
        setUser(userData);
    };
    // ADD LOGOUT METHOD
    const logout = () => {
        // REMOVE TOKEN AND USER FROM LOCAL STORAGE
        localStorage.clear();
        setToken(null);
        setUser(null);
    };

    // RETURN PROVIDER COMPONENT WITH CHILDREN
    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);