import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio_research_v1';

function loadResearch() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function Research() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const reload = () => setItems(loadResearch());
    reload();
    window.addEventListener('storage', reload);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) reload(); });
    return () => { window.removeEventListener('storage', reload); document.removeEventListener('visibilitychange', () => { if (!document.hidden) reload(); }); };
  }, []);

  return (
    <section id="research" className="container page">
      <h2 className="page-title">Research</h2>
      <p className="lead">Research projects and papers.</p>

      <div style={{ marginTop: 18 }}>
        {items.length === 0 ? (
          <div className="card">
            <p className="muted">No research entries yet. Add them via the <a className="link" href="/admin">admin</a> page.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {items.map(it => (
              <div key={it.id} className="card">
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {it.image ? (
                    <a href={it.image} target="_blank" rel="noreferrer">
                      <img
                        src={it.image}
                        alt={it.title}
                        style={{ width: 200, height: 140, objectFit: 'cover', borderRadius: 8 }}
                        onError={(e) => {
                          (async () => {
                            const img = e.target;
                            if (img.__triedBlob) { img.onerror = null; img.src = '/placeholder.svg'; return; }
                            img.__triedBlob = true;
                            const src = img.src || '';
                            try {
                              const resp = await fetch(src, { mode: 'cors' });
                              if (resp && resp.ok) {
                                const ct = (resp.headers.get('content-type') || '').toLowerCase();
                                if (ct.startsWith('image/')) {
                                  const blob = await resp.blob();
                                  img.onerror = null;
                                  img.src = URL.createObjectURL(blob);
                                  return;
                                }
                              }
                              const m = src.match(/drive\.google\.com\/(?:file\/d\/([a-zA-Z0-9_-]+)|open\?id=([a-zA-Z0-9_-]+))/);
                              const id = m ? (m[1] || m[2]) : null;
                              if (id) {
                                const alt = `https://drive.google.com/uc?export=download&id=${id}`;
                                const r2 = await fetch(alt, { mode: 'cors' });
                                if (r2 && r2.ok && (r2.headers.get('content-type') || '').startsWith('image/')) {
                                  const b2 = await r2.blob();
                                  img.onerror = null;
                                  img.src = URL.createObjectURL(b2);
                                  return;
                                }
                              }
                            } catch (err) {
                              // ignore
                            }
                            img.onerror = null;
                            img.src = '/placeholder.svg';
                          })();
                        }}
                      />
                    </a>
                  ) : null}
                  <div>
                    <h3 style={{ margin: 0 }}>{it.title}</h3>
                    <div className="muted">{(it.tags || []).join(', ')}</div>
                    <p style={{ marginTop: 8, color: 'var(--muted)' }}>{it.summary}</p>
                    <div style={{ marginTop: 8 }}>
                      {it.url ? <a className="view-btn" href={it.url} target="_blank" rel="noreferrer">Open</a> : null}
                      {it.image ? <a className="btn outline" style={{ marginLeft: 8 }} href={it.image} target="_blank" rel="noreferrer">View image</a> : null}
                    </div>
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