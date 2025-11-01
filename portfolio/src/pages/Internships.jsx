import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio_internships_v1';

function loadInternships() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function Internships() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const reload = () => setItems(loadInternships());
    reload();
    window.addEventListener('storage', reload);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) reload(); });
    return () => {
      window.removeEventListener('storage', reload);
      document.removeEventListener('visibilitychange', () => { if (!document.hidden) reload(); });
    };
  }, []);

  return (
    <section id="internships" className="container page">
      <h2 className="page-title">Internships</h2>
      <p className="lead">Internship details and completion certificates.</p>

      <div style={{ marginTop: 18 }}>
        {items.length === 0 ? (
          <div className="card">
            <p className="muted">No internships yet. Add details via the <a className="link" href="/admin">admin</a> page.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {items.map(it => (
              <div key={it.id} className="card" style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {it.image ? (
                  <a href={it.image} target="_blank" rel="noreferrer"><img src={it.image} alt={`${it.company} certificate`} style={{ width: 140, height: 100, objectFit: 'cover', borderRadius: 8 }} /></a>
                ) : null}
                <div>
                  <h3 style={{ margin: 0 }}>{it.company} <span className="muted">— {it.role}</span></h3>
                  <div className="muted">{it.period}</div>
                  <p style={{ marginTop: 8, color: 'var(--muted)' }}>{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}