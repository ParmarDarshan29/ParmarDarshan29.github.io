import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [text, setText] = useState('');

  useEffect(() => {
    // phrases shown in the typing animation
    const phrases = [
      'Building intelligent systems with data and code.',
      'Exploring the world of AI, ML, and Deep Learning.',
      'Turning ideas into data-driven solutions.'
    ];

    let mounted = true;
    let pi = 0; // phrase index
    let ci = 0; // char index
    let deleting = false;
    let timer = null;

    function tick() {
      if (!mounted) return;
      const full = phrases[pi];
      if (!deleting) {
        ci++;
        setText(full.slice(0, ci));
        if (ci === full.length) {
          // pause before deleting
          timer = setTimeout(() => { deleting = true; tick(); }, 1400);
          return;
        }
      } else {
        ci--;
        setText(full.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
          timer = setTimeout(tick, 300);
          return;
        }
      }
      timer = setTimeout(tick, deleting ? 40 : 70);
    }

    tick();
    return () => { mounted = false; clearTimeout(timer); };
  }, []);

  return (
    <section id="home" className="container page home-hero">
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h1 className="page-title">Hi  I'm Darshan Parmar</h1>

        <h2 style={{ marginTop: 8, color: 'var(--text)', fontWeight: 500 }}>
          <span id="typing">{text}</span>
          <span style={{ opacity: 0.9, marginLeft: 6 }}>{/* cursor rendered via CSS-like blink in JS */}</span>
        </h2>

        

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 18 }}>
          <Link to="/projects" className="btn primary">See Projects</Link>
          <Link to="/contact" className="btn outline">Contact</Link>
        </div>

        <div className="social-row" style={{ marginTop: 18, display: 'flex', gap: 12, justifyContent: 'center' }}>
          <a className="btn outline" href="https://github.com/ParmarDarshan29" target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn outline" href="https://linkedin.com/in/dte-gecbh-com-darshan-parmar" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
      <style>{`#typing::after { content: '|'; margin-left: 6px; opacity: .9; animation: blink 1s step-end infinite; } @keyframes blink { 50% { opacity: 0 } }`}</style>
    </section>
  );
}