const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" style={{ backgroundColor: 'var(--panel)', color: 'var(--muted)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1rem 1rem', textAlign: 'center' }}>
        <p style={{ margin: 0, color: 'var(--muted)' }}>&copy; {year} Darshan Parmar. All rights reserved.</p>
        <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>Email: <a href="mailto:connect.darshanparmar@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>connect.darshanparmar@gmail.com</a></p>
        <p style={{ margin: '6px 0 0' }}>
          <a href="https://linkedin.com/in/dte-gecbh-com-darshan-parmar" style={{ color: 'var(--accent)', textDecoration: 'none', margin: '0 0.5rem' }}>LinkedIn</a>
          <span style={{ color: 'var(--muted)' }}>|</span>
          <a href="https://github.com/ParmarDarshan29" style={{ color: 'var(--accent)', textDecoration: 'none', margin: '0 0.5rem' }}>GitHub</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;