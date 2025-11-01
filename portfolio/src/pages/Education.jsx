import React from 'react';

export default function Education() {
  return (
    <section id="education" className="container page">
      <h2 className="page-title">Education</h2>
      <p className="lead">Formal education and selected coursework.</p>

      <div className="card" style={{ marginTop: 18 }}>
        <h3 style={{ marginTop: 0 }}>B.E. — Computer Engineering</h3>
        <p className="muted">Government Engineering College, Bharuch</p>
        <p className="muted" style={{ marginTop: 8 }}>Relevant: Machine Learning, Computer Vision, Data Structures</p>
      </div>
    </section>
  );
}