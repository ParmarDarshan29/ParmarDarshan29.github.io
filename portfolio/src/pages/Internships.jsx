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

  function toPreviewUrl(url) {
    if (!url) return '';
    const u = url.trim();
    const m1 = u.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/?/);
    if (m1) return `https://drive.google.com/uc?export=view&id=${m1[1]}`;
    const m2 = u.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (m2) return `https://drive.google.com/uc?export=view&id=${m2[1]}`;
    const m3 = u.match(/uc\?export=download&id=([a-zA-Z0-9_-]+)/);
    if (m3) return `https://drive.google.com/uc?export=view&id=${m3[1]}`;
    return u;
  }

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
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <a href={toPreviewUrl(it.image)} target="_blank" rel="noreferrer noopener">
                      <img
                        src={it.image}
                        alt={`${it.company} certificate`}
                        style={{ width: 140, height: 100, objectFit: 'cover', borderRadius: 8 }}
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
                    <a className="link" href={toPreviewUrl(it.image)} target="_blank" rel="noreferrer noopener" style={{ marginTop: 8, fontSize: 13 }}>View</a>
                    {it.viewUrl ? <a className="link" href={toPreviewUrl(it.viewUrl)} target="_blank" rel="noreferrer noopener" style={{ marginTop: 8, fontSize: 13, marginLeft: 8 }}>Open certificate</a> : null}
                  </div>
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