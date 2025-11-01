import React from 'react';

export default function Contact() {
  const mailto = 'mailto:connect.darshanparmar@gmail.com';

  return (
    <section id="contact" className="container page">
      <h2 className="page-title">Contact</h2>
      <p className="lead">Available for projects — let’s build something great.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, marginTop: 16 }}>
        <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ marginTop: 0 }}>Get in touch</h3>
          <p className="muted" style={{ textAlign: 'center' }}>Click the button below to open your default email client and compose a message.</p>

          <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
            <a className="btn primary" href={mailto}>Email me</a>
          </div>
        </div>

        <aside className="card" style={{ padding: 20 }}>
          <h3 style={{ marginTop: 0, color: 'var(--accent)' }}>Contact Information</h3>
          <p className="muted">Email: <a className="link" href={mailto}>connect.darshanparmar@gmail.com</a></p>
          <p className="muted">Location: Bharuch, Gujarat</p>

          <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
            <a className="btn" href="https://github.com/ParmarDarshan29" target="_blank" rel="noreferrer" style={{ border: '1px solid var(--accent)', color: 'var(--accent)', background: 'transparent' }}>GitHub</a>
            <a className="btn" href="https://linkedin.com/in/dte-gecbh-com-darshan-parmar" target="_blank" rel="noreferrer" style={{ border: '1px solid var(--accent)', color: 'var(--accent)', background: 'transparent' }}>LinkedIn</a>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 880px) {
          #contact .container > div { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}