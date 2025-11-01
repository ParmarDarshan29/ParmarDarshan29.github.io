import React from 'react';

export default function About() {
  return (
    <section id="about" className="container page">
      <h2 className="page-title" style={{ color: 'var(--accent)' }}>About Me</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20, marginTop: 16, alignItems: 'start' }}>
        <aside className="card about-aside" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <img src={`${process.env.PUBLIC_URL}/darshan.jpg`} alt="Darshan Parmar" className="profile-photo" style={{ width: 220, height: 220, borderRadius: 14, objectFit: 'cover' }} />

          <div style={{ textAlign: 'center' }}>
            <h3 style={{ margin: '8px 0 4px' }}>Darshan Parmar</h3>
            <div style={{ color: 'var(--muted)', fontSize: 14 }}>AI & ML Researcher · Front-end Developer</div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <a className="btn primary" href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
          </div>
        </aside>

        <div className="card" style={{ padding: 20 }}>
          <p className="lead">I build meaningful, interpretable, and performance-focused AI and web experiences.</p>

          <p style={{ color: 'var(--text)' }}>
            Hi  I'm Darshan Parmar, a Computer Engineering student and AI enthusiast from Government Engineering College, Bharuch, affiliated with Gujarat Technological University.
            My work bridges Machine Learning, Deep Learning, and Explainable AI (XAI) to create transparent and equitable intelligent systems — particularly in healthcare.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, marginTop: 12 }}>
            <div>
              <h5 style={{ marginTop: 0, color: 'var(--accent)' }}>Focus</h5>
              <p className="muted">Explainable AI &amp; Model Interpretability<br/>EEG and Medical Image Analysis<br/>Web &amp; AI System Integration</p>
            </div>

            <div>
              <h5 style={{ marginTop: 0, color: 'var(--accent)' }}>Short Bio</h5>
              <p style={{ color: 'var(--text)', lineHeight: 1.6 }}>
                I love transforming complex research ideas into real-world, accessible solutions.
                Currently, I’m researching interpretable PTSD diagnosis using EEG data and developing robust AI-driven healthcare tools that enhance clinical trust and decision-making.
              </p>
              <p style={{ marginTop: 8, color: 'var(--text)' }}>
                Beyond AI, I’m interested in building sleek, performant web interfaces and exploring how design and data can work together to create better digital experiences.
              </p>
            </div>

            <div>
              <h5 style={{ marginTop: 0, color: 'var(--accent)' }}>Education</h5>
              <p className="muted">B.E. in Computer Engineering<br/>Government Engineering College, Bharuch<br/>(Expected Graduation: 2026)</p>
            </div>

            <div>
              <h5 style={{ marginTop: 0, color: 'var(--accent)' }}>Location</h5>
              <p className="muted">Remote / Bharuch, Gujarat</p>
            </div>
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