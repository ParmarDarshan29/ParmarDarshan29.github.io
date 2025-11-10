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
                    <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {it.url ? <a className="view-btn" href={it.url} target="_blank" rel="noreferrer">Open</a> : null}
                      {/* View poster opens in a new tab */}
                      {it.poster ? (
                        <a className="btn outline" href={it.poster} target="_blank" rel="noreferrer noopener">View Poster</a>
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