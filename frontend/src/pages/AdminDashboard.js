import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AdminDashboard(){
  const [stats,setStats] = useState(null);
  const [stores,setStores] = useState([]);
  const [users,setUsers] = useState([]);
  useEffect(()=>{ load(); },[]);
  async function load(){
    setStats(await api.admin.dashboard());
    setStores(await api.admin.listStores());
    setUsers(await api.admin.listUsers());
  }
  return (
    <div>
      <h3>Admin Dashboard</h3>
      {stats && <div>Total Users: {stats.totalUsers} | Total Stores: {stats.totalStores} | Total Ratings: {stats.totalRatings}</div>}
      <h4>Stores</h4>
      <table border="1" cellPadding="6"><thead><tr><th>Name</th><th>Email</th><th>Address</th><th>Overall</th></tr></thead>
      <tbody>{stores.map(s=>(<tr key={s.id}><td>{s.name}</td><td>{s.email}</td><td>{s.address}</td><td>{s.overallRating ?? '-'}</td></tr>))}</tbody></table>
      <h4>Users</h4>
      <table border="1" cellPadding="6"><thead><tr><th>Name</th><th>Email</th><th>Address</th><th>Role</th></tr></thead>
      <tbody>{users.map(u=>(<tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.address}</td><td>{u.role}</td></tr>))}</tbody></table>
    </div>
  );
}
