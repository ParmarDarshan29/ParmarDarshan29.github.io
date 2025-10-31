import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#333', color: '#fff', padding: '1rem', position: 'sticky', top: '0', zIndex: '10' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: '0' }}>
        <li><Link to="/" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', borderRadius: '5px', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#ff6600'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>Home</Link></li>
        <li><Link to="/skills" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', borderRadius: '5px', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#ff6600'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>Skills</Link></li>
        <li><Link to="/education" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', borderRadius: '5px', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#ff6600'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>Education</Link></li>
        <li><Link to="/certificates" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', borderRadius: '5px', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#ff6600'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>Certificates</Link></li>
        <li><Link to="/research" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', borderRadius: '5px', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#ff6600'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>Research</Link></li>
        <li><Link to="/internships" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', borderRadius: '5px', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#ff6600'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>Internships</Link></li>
        <li><Link to="/about" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', borderRadius: '5px', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#ff6600'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;