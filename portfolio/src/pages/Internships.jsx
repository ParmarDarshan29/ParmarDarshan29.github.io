import React, { useEffect, useState } from 'react';
import internshipsData from '../data/internships.json';

const STORAGE_KEY = 'portfolio_internships_v1';

function loadInternships() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // If localStorage is empty (admin UI removed), fall back to bundled JSON data
    return raw ? JSON.parse(raw) : internshipsData;
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
            <p className="muted">No internships yet.</p>
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
                        style={{ width: 220, height: 140, objectFit: 'cover', borderRadius: 8 }}
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
                    {/* removed Open certificate link per request */}
                  </div>
                ) : null}
                <div>
                  <h3 style={{ margin: 0 }}>{it.company} <span className="muted">— {it.role}</span></h3>
                  <div className="muted">{it.period}</div>
                  <p style={{ marginTop: 8, marginBottom: 14, color: 'var(--muted)' }}>{it.desc}</p>
                  {it.photo ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12, width: '100%' }}>
                      <img src={it.photo} alt={`${it.company} poster`} style={{ display: 'block', width: '100%', maxWidth: 720, borderRadius: 8 }} />
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}