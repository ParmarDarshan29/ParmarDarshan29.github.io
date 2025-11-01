import React, { useEffect, useState } from 'react';

export default function About() {
  const [adminNote, setAdminNote] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('portfolio_about_v1');
      if (raw) setAdminNote(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <section id="about" className="container page">
      <h2 className="page-title" style={{ color: 'var(--accent)' }}>About Me</h2>
      <p className="lead">I build clean, accessible and performance-focused front-end experiences.</p>

      {/* Two-column responsive layout: avatar/quick actions left, main content right */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20, marginTop: 16, alignItems: 'start' }}>
        <aside className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 140, height: 140, borderRadius: '50%', background: 'linear-gradient(135deg, #f97316, #fb923c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 40, fontWeight: 700 }}>
            DP
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{ margin: '8px 0 4px' }}>Darshan Parmar</h3>
            <div style={{ color: 'var(--muted)', fontSize: 14 }}>Front-end Developer</div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <a className="btn primary" href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
            <a className="btn" href="/contact">Contact</a>
          </div>

          {/* Skills removed from About sidebar as requested */}
        </aside>

        <div className="card" style={{ padding: 20 }}>
          <div className="admin-note" style={{ marginBottom: 12 }}>
            <strong>Note (admin):</strong>
            {adminNote ? (
              <p style={{ margin: '6px 0 0' }}>{adminNote}</p>
            ) : (
              <p style={{ margin: '6px 0 0' }} className="muted">This is admin — I can change this according to my updates. Edit this block to quickly update public information.</p>
            )}
          </div>
          <p style={{ color: 'var(--text)', marginBottom: 12 }}>
            Hi — I'm Darshan Parmar, a front-end developer focused on building simple, robust and accessible web applications.
            I care about readable code, good typography and performant delivery.
          </p>

          <ul style={{ marginTop: 8, color: 'var(--muted)' }}>
            <li><strong>Focus:</strong> Interfaces, performance, accessibility</li>
            <li><strong>Stack:</strong> React, Vite, JavaScript, CSS</li>
            <li><strong>Location:</strong> Remote / Bharuch, Gujarat</li>
          </ul>

          <div style={{ marginTop: 14 }}>
            <h4 style={{ marginTop: 0, color: 'var(--accent)' }}>Short Bio</h4>
            <p style={{ marginTop: 6, color: 'var(--text)' }}>
              I enjoy turning complex problems into simple, beautiful and intuitive user experiences. When I'm not coding, I like reading about performance optimizations and exploring new front-end patterns.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          #about .container > div { grid-template-columns: 1fr; }
          #about .card { padding: 16px; }
        }
      `}</style>
    </section>
  );
}