import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#555', color: '#fff', padding: '1rem', position: 'sticky', top: '0', zIndex: '10', transition: 'background-color 0.3s ease' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: '0' }}>
        <li><Link to="/" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', borderRadius: '5px', transition: 'background-color 0.3s ease, color 0.3s ease' }} onMouseOver={(e) => { e.target.style.backgroundColor = '#ff6600'; e.target.style.color = '#fff'; }} onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#fff'; }}>Home</Link></li>
        <li><Link to="/skills" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', borderRadius: '5px', transition: 'background-color 0.3s ease, color 0.3s ease' }} onMouseOver={(e) => { e.target.style.backgroundColor = '#ff6600'; e.target.style.color = '#fff'; }} onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#fff'; }}>Skills</Link></li>
  {/* Education removed from nav */}
        <li><Link to="/certificates" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', borderRadius: '5px', transition: 'background-color 0.3s ease, color 0.3s ease' }} onMouseOver={(e) => { e.target.style.backgroundColor = '#ff6600'; e.target.style.color = '#fff'; }} onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#fff'; }}>Certificates</Link></li>
        <li><Link to="/research" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', borderRadius: '5px', transition: 'background-color 0.3s ease, color 0.3s ease' }} onMouseOver={(e) => { e.target.style.backgroundColor = '#ff6600'; e.target.style.color = '#fff'; }} onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#fff'; }}>Research</Link></li>
        <li><Link to="/internships" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', borderRadius: '5px', transition: 'background-color 0.3s ease, color 0.3s ease' }} onMouseOver={(e) => { e.target.style.backgroundColor = '#ff6600'; e.target.style.color = '#fff'; }} onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#fff'; }}>Internships</Link></li>
        <li><Link to="/about" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', borderRadius: '5px', transition: 'background-color 0.3s ease, color 0.3s ease' }} onMouseOver={(e) => { e.target.style.backgroundColor = '#ff6600'; e.target.style.color = '#fff'; }} onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#fff'; }}>About</Link></li>
        <li><Link to="/contact" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', borderRadius: '5px', transition: 'background-color 0.3s ease, color 0.3s ease' }} onMouseOver={(e) => { e.target.style.backgroundColor = '#ff6600'; e.target.style.color = '#fff'; }} onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#fff'; }}>Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;