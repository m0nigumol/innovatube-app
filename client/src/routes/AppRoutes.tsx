/* 
THIS FILE CONTAINS THE ROUTES OF THE APPLICATION
AND HELPS TO PROTECT AND NAVIGATE TROUGH THE APP
MAINTAINING ORGANIZATION IN PAGES
*/

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { LogIn, SignUp, Home, ForgotPassword } from '../pages/PagesBarrel';

// PROTECTED ROUTE COMPONENT
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

export function AppRouter() {
    return (
        // WRAP ROUTES WITH AUTH PROVIDER
        <AuthProvider>
            {/* USE BROWSER ROUTER */}
            <BrowserRouter>
                {/* ADD ROUTES */}
                <Routes>
                    {/* PUBLIC ROUTES */}
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    {/* AUTHENTICATED ROUTES */}
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    {/* REDIRECTS */}
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}