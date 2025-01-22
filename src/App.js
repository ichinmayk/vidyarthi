
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import InstituteAdmin from './pages/InstituteAdmin';
import FeeManagement from './pages/FeeManagement';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<InstituteAdmin />} />
                <Route path="/fee-management" element={<FeeManagement />} />
            </Routes>
        </Router>
    );
}

export default App;
