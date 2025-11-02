import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio_activities_v1';

function loadActivities() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function Activities() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const reload = () => setItems(loadActivities());
    reload();
    window.addEventListener('storage', reload);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) reload(); });
    return () => { window.removeEventListener('storage', reload); document.removeEventListener('visibilitychange', () => { if (!document.hidden) reload(); }); };
  }, []);

  return (
    <section id="activities" className="container page">
      <h2 className="page-title">Activities</h2>
      <p className="lead">Recent activities and events — photos and short notes.</p>

      <div style={{ marginTop: 18 }}>
        {items.length === 0 ? (
          <div className="card">
            <p className="muted">No activities yet. Add entries via the <a className="link" href="/admin">admin</a> page.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {items.map(it => (
              <div key={it.id} className="card">
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {it.images && it.images[0] ? (
                    <a href={it.images[0]} target="_blank" rel="noreferrer"><img src={it.images[0]} alt={it.title} style={{ width: 200, height: 140, objectFit: 'cover', borderRadius: 8 }} /></a>
                  ) : null}
                  <div>
                    <h3 style={{ margin: 0 }}>{it.title}</h3>
                    <div className="muted">{it.date} {it.location ? `· ${it.location}` : ''}</div>
                    <p style={{ marginTop: 8, color: 'var(--muted)' }}>{it.desc}</p>
                    {it.images && it.images.length > 1 ? (
                      <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                        {it.images.map((img, idx) => (
                          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <a href={img} target="_blank" rel="noreferrer"><img src={img} alt={`${it.title} ${idx+1}`} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 6 }} /></a>
                            <a className="link" href={img} target="_blank" rel="noreferrer" style={{ marginTop: 6, fontSize: 12 }}>View</a>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
