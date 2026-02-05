import React, { useState } from 'react';
import api from '../api';

export default function UpdatePassword(){
  const [form, setForm] = useState({ oldPassword: '', newPassword: '' });
  const [msg, setMsg] = useState(null);
  const submit = async e => {
    e.preventDefault(); setMsg(null);
    try{
      await api.auth.updatePassword(form);
      setMsg('Password updated successfully');
      setForm({ oldPassword: '', newPassword: '' });
    }catch(e){ setMsg(e.message); }
  };
  return (
    <div className="max-w-md mx-auto bg-white shadow rounded p-6">
      <h3 className="text-xl font-semibold mb-4">Update Password</h3>
      {msg && <div className={`mb-2 ${msg.startsWith('Password updated') ? 'text-green-600' : 'text-red-600'}`}>{msg}</div>}
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Old Password</label>
          <input type="password" value={form.oldPassword} onChange={e=>setForm({...form,oldPassword:e.target.value})} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm mb-1">New Password</label>
          <input type="password" value={form.newPassword} onChange={e=>setForm({...form,newPassword:e.target.value})} required className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="flex justify-end">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">Update Password</button>
        </div>
      </form>
    </div>
  );
}