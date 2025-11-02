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

  function toPreviewUrl(url) {
    if (!url) return '';
    const u = url.trim();
    // drive download -> preview
    const m1 = u.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/?/);
    if (m1) return `https://drive.google.com/uc?export=view&id=${m1[1]}`;
    const m2 = u.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (m2) return `https://drive.google.com/uc?export=view&id=${m2[1]}`;
    const m3 = u.match(/uc\?export=download&id=([a-zA-Z0-9_-]+)/);
    if (m3) return `https://drive.google.com/uc?export=view&id=${m3[1]}`;
    return u;
  }

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
                    <a href={toPreviewUrl(it.images[0])} target="_blank" rel="noreferrer noopener">
                      <img
                        src={it.images[0]}
                        alt={it.title}
                        style={{ width: 200, height: 140, objectFit: 'cover', borderRadius: 8 }}
                        onError={(e) => {
                          // Try to fetch the image as a blob and use an object URL.
                          // This bypasses some cross-site embedding restrictions that still allow fetch.
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
                              // fallback: try Drive direct-download if we can extract an ID
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
                              // ignore and show placeholder below
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
                    <div className="muted">{it.date} {it.location ? `· ${it.location}` : ''}</div>
                    <p style={{ marginTop: 8, color: 'var(--muted)' }}>{it.desc}</p>
                    {it.images && it.images.length > 1 ? (
                      <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                        {it.images.map((img, idx) => (
                          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <a href={toPreviewUrl(img)} target="_blank" rel="noreferrer noopener">
                              <img
                                src={img}
                                alt={`${it.title} ${idx+1}`}
                                style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 6 }}
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
                            <a className="link" href={toPreviewUrl(img)} target="_blank" rel="noreferrer noopener" style={{ marginTop: 6, fontSize: 12 }}>View</a>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {it.viewUrl ? (
                      <div style={{ marginTop: 8 }}>
                        <a className="btn outline" href={it.viewUrl} target="_blank" rel="noreferrer">View full photo / certificate</a>
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
