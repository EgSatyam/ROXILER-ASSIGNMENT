import React, { useEffect, useState } from 'react';
import api from '../api';

export default function UserStores(){
  const [stores, setStores] = useState([]);
  const [q, setQ] = useState('');
  const [rating, setRating] = useState({});
  const load = async () => {
    const res = await api.stores.list(q ? `?name=${encodeURIComponent(q)}` : '');
    setStores(res);
  };
  useEffect(()=>{ load(); }, []);
  const submit = async (id) => {
    try{
      await api.stores.submitRating(id, { rating: Number(rating[id]) });
      alert('Rated'); load();
    }catch(e){ alert(e.body?.message || JSON.stringify(e)); }
  };
  const update = async (id) => {
    try{ await api.stores.updateRating(id, { rating: Number(rating[id]) }); alert('Updated'); load(); }catch(e){ alert(e.body?.message || JSON.stringify(e)); }
  };
  return (
    <div>
      <h3>Stores</h3>
      <div><input placeholder="Search name" value={q} onChange={e=>setQ(e.target.value)} /> <button onClick={()=>load()}>Search</button></div>
      <table border="1" cellPadding="6" style={{marginTop:10}}>
        <thead><tr><th>Name</th><th>Address</th><th>Overall</th><th>Your Rating</th><th>Action</th></tr></thead>
        <tbody>
          {stores.map(s=> (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.address}</td>
              <td>{s.overallRating ?? '-'}</td>
              <td><input value={rating[s.id]||''} onChange={e=>setRating({...rating,[s.id]:e.target.value})} placeholder="1-5" /></td>
              <td>
                <button onClick={()=>submit(s.id)}>Submit</button>
                <button onClick={()=>update(s.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
