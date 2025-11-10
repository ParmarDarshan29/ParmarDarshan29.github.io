import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const [open, setOpen] = useState(false);
  const active = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  const handleLinkClick = () => { if (open) setOpen(false); };

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <NavLink to="/" className="logo">Darshan Parmar</NavLink>

        {/* mobile nav toggle */}
        <button
          className={`nav-toggle ${open ? 'open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(v => !v)}
        >
          <span className="bar" aria-hidden="true" />
          <span className="bar" aria-hidden="true" />
          <span className="bar" aria-hidden="true" />
        </button>

  <nav id="main-nav" className={`nav ${open ? 'open' : ''}`} role="navigation" aria-label="Main navigation">
          <NavLink to="/" className={active} end onClick={handleLinkClick}>Home</NavLink>
          <NavLink to="/about" className={active} onClick={handleLinkClick}>About</NavLink>
          <NavLink to="/skills" className={active} onClick={handleLinkClick}>Skills</NavLink>
          <NavLink to="/research" className={active} onClick={handleLinkClick}>Research</NavLink>
          <NavLink to="/internships" className={active} onClick={handleLinkClick}>Internships</NavLink>
          <NavLink to="/projects" className={active} onClick={handleLinkClick}>Projects</NavLink>
          <NavLink to="/activities" className={active} onClick={handleLinkClick}>Activities</NavLink>
          <NavLink to="/contact" className={active} onClick={handleLinkClick}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}