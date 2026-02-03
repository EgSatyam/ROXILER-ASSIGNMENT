import React, { useState } from 'react';
import api from '../api';

export default function Login({ onLogin }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const submit = async e => {
    e.preventDefault(); setErr(null);
    try{
      const res = await api.auth.login({ email, password });
      onLogin(res);
    }catch(e){ setErr(e.body?.message || JSON.stringify(e.body) || 'Login failed'); }
  };
  return (
    <form onSubmit={submit} style={{maxWidth:400}}>
      <h3>Login</h3>
      {err && <div style={{color:'red'}}>{err}</div>}
      <div><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} required /></div>
      <div><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
      <button>Login</button>
    </form>
  );
}
