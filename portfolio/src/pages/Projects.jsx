import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio_projects_v1';

function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  return (
    <section id="projects" className="container page projects">
      <h2 className="page-title">Projects</h2>
      <p className="lead">A list of projects. Use the admin page to add, edit or remove items.</p>

      <div style={{ marginTop: 18 }}>
        {projects.length === 0 ? (
          <div className="card">
            <p className="muted">No projects added yet. Add projects via the <a className="link" href="/admin">admin</a> page.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((p) => (
              <article key={p.id || p.title} className="project-card card">
                {p.image && <div className="thumb" style={{ backgroundImage: `url(${p.image})` }} aria-hidden="true" />}
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