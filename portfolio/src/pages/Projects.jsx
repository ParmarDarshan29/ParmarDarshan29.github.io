import React from 'react';
import projects from '../data/projects.json';

export default function Projects() {
  const list = Array.isArray(projects) ? projects : [];

  return (
    <section id="projects" className="container page projects">
      <h2 className="page-title">Projects</h2>
      <p className="lead">Selected projects and highlights.</p>

      <div style={{ marginTop: 18 }}>
        {list.length === 0 ? (
          <div className="card">
            <p className="muted">No projects available.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {list.map((p) => (
              <article key={p.id || p.title} className={`project-card card ${p.id ? p.id : ''}`}>
                {p.image ? (
                  <div className="thumb" aria-hidden="true">
                    <img src={p.image} alt={p.title} className="thumb-img" />
                  </div>
                ) : null}

                <div className="project-body">
                  <h3 className="project-title">{p.title}</h3>
                  <p className="desc">{p.desc}</p>

                  <div className="meta">
                    <div className="tag-list">
                      {(p.tags || []).map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>

                    {p.url ? (
                      <a className="btn view-btn" href={p.url} target="_blank" rel="noreferrer">View</a>
                    ) : (
                      <span className="muted">No link</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}