const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#555', color: '#fff', padding: '1rem', textAlign: 'center', marginTop: 'auto', transition: 'background-color 0.3s ease' }}>
      <p>&copy; 2023 Darshan Parmar. All rights reserved.</p>
      <p style={{ color: '#ddd' }}>Contact: <a href="mailto:connect.darshanparmar@gmail.com" style={{ color: '#ff6600', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#e55a00'} onMouseLeave={(e) => e.target.style.color = '#ff6600'}>connect.darshanparmar@gmail.com</a></p>
      <p style={{ color: '#ddd' }}>
        <a href="https://linkedin.com/in/dte-gecbh-com-darshan-parmar" style={{ color: '#ff6600', textDecoration: 'none', margin: '0 1rem', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#e55a00'} onMouseLeave={(e) => e.target.style.color = '#ff6600'}>LinkedIn</a> | 
        <a href="https://github.com/ParmarDarshan29" style={{ color: '#ff6600', textDecoration: 'none', margin: '0 1rem', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#e55a00'} onMouseLeave={(e) => e.target.style.color = '#ff6600'}>GitHub</a>
      </p>
    </footer>
  );
};

export default Footer;