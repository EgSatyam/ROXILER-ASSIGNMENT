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
    <div className="max-w-md mx-auto bg-white shadow rounded p-6">
      <h3 className="text-xl font-semibold mb-4">Login</h3>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="flex justify-end">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">Login</button>
        </div>
      </form>
    </div>
  );
}
