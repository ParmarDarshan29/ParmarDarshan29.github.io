import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thanks — message sent (demo).');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="container page">
      <h2 className="page-title">Contact</h2>
      <p className="lead">Available for projects — let’s build something great.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, marginTop: 16 }}>
        <form className="card" onSubmit={handleSubmit} style={{ padding: 20 }}>
          <label className="label">Name</label>
          <input className="input" name="name" value={formData.name} onChange={handleChange} required />

          <label className="label" style={{ marginTop: 12 }}>Email</label>
          <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label className="label" style={{ marginTop: 12 }}>Message</label>
          <textarea className="input" name="message" value={formData.message} onChange={handleChange} required style={{ minHeight: 160 }} />

          <div style={{ marginTop: 14, display: 'flex', gap: 12 }}>
            <button className="btn primary" type="submit">Send Message</button>
            <a className="link" href="mailto:connect.darshanparmar@gmail.com">Email me</a>
          </div>
        </form>

        <aside className="card" style={{ padding: 20 }}>
          <h3 style={{ marginTop: 0, color: 'var(--accent)' }}>Contact Information</h3>
          <p className="muted">Email: <a className="link" href="mailto:connect.darshanparmar@gmail.com">connect.darshanparmar@gmail.com</a></p>
          <p className="muted">Phone: +91 8141902382</p>
          <p className="muted">Location: Bharuch, Gujarat</p>

          <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
            <a className="btn" href="https://github.com/ParmarDarshan29" target="_blank" rel="noreferrer" style={{ border: '1px solid var(--accent)', color: 'var(--accent)', background: 'transparent' }}>GitHub</a>
            <a className="btn" href="https://linkedin.com/in/dte-gecbh-com-darshan-parmar" target="_blank" rel="noreferrer" style={{ border: '1px solid var(--accent)', color: 'var(--accent)', background: 'transparent' }}>LinkedIn</a>
          </div>
        </aside>
      </div>

      {/* responsive fallback */}
      <style>{`
        @media (max-width: 880px) {
          #contact .container > div { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}