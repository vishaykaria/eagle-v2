import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CurrentAccount from './pages/CurrentAccount';
import StocksAndSharesISA from './pages/StocksAndSharesISA';
import SIPP from './pages/SIPP';
import Help from './pages/Help';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/current-account" element={<CurrentAccount />} />
            <Route path="/isa" element={<StocksAndSharesISA />} />
            <Route path="/sipp" element={<SIPP />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;