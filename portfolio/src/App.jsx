import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Research from './pages/Research';
import Internships from './pages/Internships';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './index.css';

export default function App() {
  return (
    <Router>
      <Header />
      <MainWithFooter />
    </Router>
  );
}

function MainWithFooter() {
  const location = useLocation();
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/research" element={<Research />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          {/* admin route is intentionally unlinked in the header */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {/* render footer on all pages except Contact */}
      {location.pathname !== '/contact' && <Footer />}
    </>
  );
}