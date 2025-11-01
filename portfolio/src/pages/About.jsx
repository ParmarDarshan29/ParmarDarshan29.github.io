import React from 'react';

export default function About() {
  return (
    <section id="about" className="container page">
      <h2 className="page-title" style={{ color: 'var(--accent)' }}>About Me</h2>
      <p className="lead">I build clean, accessible and performance-focused front-end experiences.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginTop: 16 }}>
        <div className="card" style={{ padding: 20 }}>
          <p style={{ color: 'var(--text)', marginBottom: 12 }}>
            Hi — I'm Darshan Parmar, a front-end developer focused on building simple, robust and accessible web applications.
            I care about readable code, good typography and performant delivery.
          </p>

          <ul style={{ marginTop: 8, color: 'var(--muted)' }}>
            <li><strong>Focus:</strong> Interfaces, performance, accessibility</li>
            <li><strong>Stack:</strong> React, Vite, JavaScript, CSS</li>
            <li><strong>Location:</strong> Remote / Bharuch, Gujarat</li>
          </ul>

          <div style={{ marginTop: 14, display: 'flex', gap: 12 }}>
            <a className="btn primary" href="/resume.pdf" target="_blank" rel="noreferrer">Download CV</a>
            <a className="link" href="/contact">Contact</a>
          </div>
        </div>

        <aside className="card" style={{ padding: 20, background: 'linear-gradient(180deg, rgba(249,115,22,0.06), rgba(249,115,22,0.02))' }}>
          <h4 style={{ marginTop: 0, color: 'var(--bg)' }}>Skills</h4>
          <div className="skill-list" style={{ marginTop: 10 }}>
            <span className="tag">React</span>
            <span className="tag">JavaScript</span>
            <span className="tag">HTML</span>
            <span className="tag">CSS</span>
            <span className="tag">Accessibility</span>
            <span className="tag">Performance</span>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 880px) {
          #about .container > div { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}