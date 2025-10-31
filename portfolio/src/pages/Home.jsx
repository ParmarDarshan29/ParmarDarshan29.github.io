const Home = () => {
  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#000', color: '#fff', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: '#ff6600', fontSize: '3rem', marginBottom: '1rem' }}>Welcome to My Portfolio</h1>
      <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>Darshan Parmar</h2>
      <p style={{ color: '#ccc', fontSize: '1.2rem', marginBottom: '2rem' }}>
        Computer Engineering Student | Bharuch, Gujarat<br/>
        Passionate about Data Science, Machine Learning, and AI-driven healthcare solutions.
      </p>
      <p style={{ color: '#888' }}>Explore my skills, projects, research, and experiences below.</p>
      <div style={{ marginTop: '2rem' }}>
        <a href="https://github.com/ParmarDarshan29" style={{ color: '#ff6600', textDecoration: 'none', margin: '0 1rem' }}>GitHub</a>
        <a href="https://linkedin.com/in/dte-gecbh-com-darshan-parmar" style={{ color: '#ff6600', textDecoration: 'none', margin: '0 1rem' }}>LinkedIn</a>
        <a href="mailto:connect.darshanparmar@gmail.com" style={{ color: '#ff6600', textDecoration: 'none', margin: '0 1rem' }}>Email</a>
      </div>
    </div>
  );
};

export default Home;