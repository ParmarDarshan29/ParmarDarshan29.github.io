import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio_skills_v1';

function loadSkills() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const reload = () => setSkills(loadSkills());
    // initial load
    reload();

    // update when another tab / window changes storage
    window.addEventListener('storage', reload);
    // also reload when tab becomes visible (useful after admin edits in same tab)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) reload();
    });

    return () => {
      window.removeEventListener('storage', reload);
      document.removeEventListener('visibilitychange', () => { if (!document.hidden) reload(); });
    };
  }, []);

  return (
    <section id="skills" className="container page">
      <h2 className="page-title">Skills</h2>
      <p className="lead">Tools and areas I work in.</p>

      <div style={{ marginTop: 18 }}>
        {skills.length === 0 ? (
          <div className="card">
            <p className="muted">No skills added yet. Add skills via the <a className="link" href="/admin">admin</a> page.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {skills.map((s) => (
              <span key={s} className="tag" style={{ background: 'rgba(249,115,22,0.08)', color: 'var(--accent)' }}>
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}