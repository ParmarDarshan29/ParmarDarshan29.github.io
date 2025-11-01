import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [text, setText] = useState('');
  // typing effect phrases
  useEffect(() => {
    // updated phrases and timings
    const phrases = ['Front-end Developer', 'UI Engineer', "I build things you love"];
    let pi = 0; let ci = 0; let deleting = false; let mounted = true;

    function tick() {
      if (!mounted) return;
      const full = phrases[pi];
      if (!deleting) {
        ci++;
        setText(full.slice(0, ci));
        if (ci === full.length) {
          deleting = true;
          // stay for a bit before deleting
          setTimeout(tick, 1400);
          return;
        }
      } else {
        ci--;
        setText(full.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
          setTimeout(tick, 300);
          return;
        }
      }
      // slower typing, faster deleting
      setTimeout(tick, deleting ? 50 : 80);
    }

    tick();
    return () => { mounted = false; };
  }, []);

  return (
    <section id="home" className="container page home-hero">
      <div style={{ textAlign: 'center' }}>
        <h1 className="page-title">Hi — I'm Darshan Parmar <span id="typing">{text}</span></h1>
        <p className="lead">I build clear, performant interfaces. I focus on accessible, fast and beautiful UIs.</p>

        <p className="hero-sub">Designer · Engineer · Curious problem solver</p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 18 }}>
          <Link to="/projects" className="btn primary">See Projects</Link>
          <Link to="/contact" className="btn outline">Contact</Link>
        </div>

        <div className="social-row" style={{ marginTop: 18, display: 'flex', gap: 12, justifyContent: 'center' }}>
          <a className="btn outline" href="https://github.com/ParmarDarshan29" target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn outline" href="https://linkedin.com/in/dte-gecbh-com-darshan-parmar" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}