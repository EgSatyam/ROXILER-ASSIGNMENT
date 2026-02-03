import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
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
    <div style={{padding:20}}>
      <header style={{display:'flex',gap:10}}>
        <Link to="/">Home</Link>
        {!role && <Link to="/login">Login</Link>}
        {!role && <Link to="/signup">Signup</Link>}
        {role && <button onClick={logout}>Logout</button>}
      </header>
      <hr />
      <Routes>
        <Route path="/login" element={<Login onLogin={(r)=>{ localStorage.setItem('token', r.token); localStorage.setItem('role', r.role); localStorage.setItem('name', r.name); setRole(r.role); window.location.href = '/'; }} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Protected role={'ADMIN'}><AdminDashboard /></Protected>} />
        <Route path="/owner" element={<Protected role={'STORE_OWNER'}><OwnerDashboard /></Protected>} />
        <Route path="/" element={<Protected><UserStores /></Protected>} />
      </Routes>
    </div>
  );
}
