import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section id="home" className="container page">
      <h1 className="page-title">Hi — I'm Darshan Parmar</h1>
      <p className="lead">
        I build clear, performant interfaces. Browse the site to see my work, research and experience.
      </p>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 18 }}>
        <Link to="/projects" className="btn primary">See Projects</Link>
        <Link to="/contact" className="link">Contact</Link>
      </div>
    </section>
  );
}