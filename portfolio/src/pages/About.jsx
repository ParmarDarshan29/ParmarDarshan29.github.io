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
          </div>
        </aside>

        <div className="card" style={{ padding: 20 }}>
          <p className="lead">I build meaningful, interpretable, and performance-focused AI and web experiences.</p>

          <p style={{ color: 'var(--text)' }}>
            I’m Darshan Parmar, a Computer Engineering student passionate about Data Science, Artificial Intelligence, Machine Learning, and Deep Learning. I enjoy exploring how data-driven technologies and intelligent systems can solve real-world problems and create meaningful, efficient solutions.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, marginTop: 12 }}>
            <div>
              <h5 style={{ marginTop: 0, color: 'var(--accent)' }}>Focus</h5>
              <p className="muted">Data Science · Machine Learning · Deep Learning · AI System Integration</p>
            </div>

            <div>
              <h5 style={{ marginTop: 0, color: 'var(--accent)' }}>Profile</h5>
              <p style={{ color: 'var(--text)', lineHeight: 1.6 }}>
                I work on end-to-end ML systems, from high-fidelity data extraction and preprocessing to model development and deployment. I enjoy combining research-led approaches with production-ready engineering to deliver tools that are both effective and usable.
              </p>
            </div>

            <div>
              <h5 style={{ marginTop: 0, color: 'var(--accent)' }}>Education</h5>
              <p className="muted">Bachelor of Engineering in Computer Engineering<br/>Government Engineering College, Bharuch<br/>Affiliated with Gujarat Technological University<br/>(Expected Graduation: June 2026)</p>
            </div>

            <div>
              <h5 style={{ marginTop: 0, color: 'var(--accent)' }}>Location</h5>
              <p className="muted">Bharuch, Gujarat, India</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          /* the .container class is on the section itself; target the direct child grid div */
          #about > div { grid-template-columns: 1fr !important; }
          #about .card { padding: 16px; }
          /* make aside non-sticky on smaller screens */
          #about .about-aside { position: static; top: auto; }
        }
      `}</style>
    </section>
  );
}