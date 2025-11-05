import React from 'react';
import skills from '../data/skills.json';

export default function Skills() {
  const list = Array.isArray(skills) ? skills : [];

  return (
    <section id="skills" className="container page">
      <h2 className="page-title">Skills</h2>
      <p className="lead">Tools and areas I work in.</p>

      <div style={{ marginTop: 18 }}>
        {list.length === 0 ? (
          <div className="card">
            <p className="muted">No skills available.</p>
          </div>
        ) : (
          <div className="skills-grid">
            {list.map((s) => (
              <div key={s.name} className="skill-card" tabIndex={0} aria-label={s.name}>
                <div className="skill-icon-wrapper">
                  <div className={`skill-icon ${s.image ? 'has-img' : ''}`}>
                    {s.image ? (
                        <img className="skill-img" src={s.image} alt={s.name} onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                    ) : (
                      <div className="skill-initials">{s.name.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase()}</div>
                    )}
                    <div className="led" />
                  </div>
                </div>
                <div className="skill-name">{s.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}