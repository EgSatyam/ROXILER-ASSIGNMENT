import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import UpdatePassword from './components/UpdatePassword';
import AdminDashboard from './pages/AdminDashboard';
import UserStores from './pages/UserStores';
import OwnerDashboard from './pages/OwnerDashboard';

function Protected({ children, role }){
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  if (!token) return <div>Please <Link to="/login">login</Link></div>;
  if (role && role !== userRole) return <div>Access denied</div>;
  return children;
}

export default function App(){
  const [role, setRole] = useState(localStorage.getItem('role'));
  const navigate = useNavigate();
  useEffect(()=>{
    const r = localStorage.getItem('role');
    setRole(r);
  },[]);
  const logout = ()=>{ localStorage.removeItem('token'); localStorage.removeItem('role'); localStorage.removeItem('name'); setRole(null); navigate('/login'); };
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-blue-600 text-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <nav className="flex items-center gap-4">
            {role !== 'ADMIN' && role !== 'STORE_OWNER' && <Link to="/" className="text-white hover:text-blue-200 font-medium">Home</Link>}
            {role === 'ADMIN' && <Link to="/admin" className="text-white hover:text-blue-200 font-medium">Admin Dashboard</Link>}
            {role === 'STORE_OWNER' && <Link to="/owner" className="text-white hover:text-blue-200 font-medium">Owner Dashboard</Link>}
          </nav>
          <div className="flex items-center gap-4">
            {!role && <Link to="/login" className="text-white hover:text-blue-200 hover:underline">Login</Link>}
            {!role && <Link to="/signup" className="text-white hover:text-blue-200 hover:underline">Signup</Link>}
            {role && <Link to="/update-password" className="text-white hover:text-blue-200 hover:underline">Update Password</Link>}
            {role && <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Logout</button>}
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6">
      <Routes>
        <Route path="/login" element={<Login onLogin={(r)=>{ localStorage.setItem('token', r.token); localStorage.setItem('role', r.role); localStorage.setItem('name', r.name); setRole(r.role); navigate(r.role === 'ADMIN' ? '/admin' : r.role === 'STORE_OWNER' ? '/owner' : '/'); }} />} />
        <Route path="/signup" element={<Signup onSignup={(r)=>{ localStorage.setItem('token', r.token); localStorage.setItem('role', r.role); localStorage.setItem('name', r.name); setRole(r.role); navigate(r.role === 'ADMIN' ? '/admin' : r.role === 'STORE_OWNER' ? '/owner' : '/'); }} />} />
        <Route path="/update-password" element={<Protected><UpdatePassword /></Protected>} />
        <Route path="/admin" element={<Protected role={'ADMIN'}><AdminDashboard /></Protected>} />
        <Route path="/owner" element={<Protected role={'STORE_OWNER'}><OwnerDashboard /></Protected>} />
        <Route path="/" element={<Protected><UserStores /></Protected>} />
      </Routes>
      </main>
    </div>
  );
}
