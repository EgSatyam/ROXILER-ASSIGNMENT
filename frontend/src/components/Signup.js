import React, { useState } from 'react';
import api from '../api';

export default function Signup(){
  const [form, setForm] = useState({ name:'', email:'', address:'', password:'' });
  const [msg, setMsg] = useState(null);
  const submit = async e => {
    e.preventDefault(); setMsg(null);
    try{
      await api.auth.signup(form);
      setMsg('Signup success. Please login.');
    }catch(e){ setMsg(e.body?.message || JSON.stringify(e.body)); }
  };
  return (
    <form onSubmit={submit} style={{maxWidth:500}}>
      <h3>Signup (Normal User)</h3>
      {msg && <div>{msg}</div>}
      <div><label>Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required /></div>
      <div><label>Email</label><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required /></div>
      <div><label>Address</label><input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} /></div>
      <div><label>Password</label><input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required /></div>
      <button>Signup</button>
    </form>
  );
}
