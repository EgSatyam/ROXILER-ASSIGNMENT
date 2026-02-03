import React, { useEffect, useState } from 'react';
import api from '../api';

export default function OwnerDashboard(){
  const [data, setData] = useState([]);
  useEffect(()=>{ api.owner.dashboard().then(setData).catch(e=>alert(JSON.stringify(e))); },[]);
  return (
    <div>
      <h3>Owner Dashboard</h3>
      {data.map(s => (
        <div key={s.storeId} style={{border:'1px solid #ccc',padding:8,margin:8}}>
          <h4>{s.name} — Avg: {s.averageRating ?? '-'}</h4>
          <ul>{s.ratingsByUsers.map(u=>(<li key={u.userId}>{u.name} ({u.email}) — {u.rating}</li>))}</ul>
        </div>
      ))}
    </div>
  );
}
