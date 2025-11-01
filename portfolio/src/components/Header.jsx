import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const active = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <NavLink to="/" className="logo">Darshan Parmar</NavLink>

        <nav className="nav" role="navigation" aria-label="Main navigation">
          <NavLink to="/" className={active} end>Home</NavLink>
          <NavLink to="/about" className={active}>About</NavLink>
          <NavLink to="/skills" className={active}>Skills</NavLink>
          <NavLink to="/research" className={active}>Research</NavLink>
          <NavLink to="/internships" className={active}>Internships</NavLink>
          <NavLink to="/projects" className={active}>Projects</NavLink>
          <NavLink to="/contact" className={active}>Contact</NavLink>

          {/* admin / login link */}
          <NavLink to="/admin" className={active} style={{ marginLeft: 8, paddingLeft: 12, paddingRight: 12 }}>
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}