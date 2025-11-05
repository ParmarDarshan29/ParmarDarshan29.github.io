import React from 'react';
import research from '../data/research.json';

export default function Research() {
  const list = Array.isArray(research) ? research : [];

  return (
    <section id="research" className="container page">
      <h2 className="page-title">Research</h2>
      <p className="lead">Research projects and papers.</p>

      <div style={{ marginTop: 18 }}>
        {list.length === 0 ? (
          <div className="card">
            <p className="muted">No research entries yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {list.map(it => (
              <div key={it.id} className="card">
                {it.image ? (
                  <a href={it.image} target="_blank" rel="noreferrer">
                    <img src={it.image} alt={it.title} className="research-hero" />
                  </a>
                ) : null}

                <div style={{ paddingTop: it.image ? 12 : 0 }}>
                  <h3 style={{ margin: 0 }}>{it.title}</h3>
                  <div className="muted">{(it.tags || []).join(', ')}</div>
                  <p style={{ marginTop: 8, color: 'var(--muted)' }}>{it.summary}</p>
                  <div style={{ marginTop: 8 }}>
                    {it.url ? <a className="view-btn" href={it.url} target="_blank" rel="noreferrer">Open</a> : null}
                  </div>
                </div>

                {/* Research poster block — show if poster field present */}
                {it.poster ? (
                  <div style={{ marginTop: 14 }}>
                    <h4 className="poster-heading">Research poster</h4>
                    <img src={it.poster} alt={`${it.title} poster`} className="poster-hero" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}