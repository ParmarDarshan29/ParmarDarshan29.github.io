const Certificates = () => {
  const certificates = [
    { title: 'The iScale: Full Stack Data Science with Generative AI Program', link: '#' },
    { title: 'CSRBox collaborated with IBM SkillsBuild: Artificial Intelligence', link: '#' },
    { title: 'IBM SkillBuild Data Analytics with CSRBox', link: '' },
    { title: 'CSRBox collaborated with IBM SkillsBuild: Data Analytics', link: '#' },
  ];

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#777', color: '#fff', padding: '2rem', animation: 'fadeIn 1s ease-in' }}>
      <h1 style={{ color: '#ff6600', fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#e55a00'} onMouseLeave={(e) => e.target.style.color = '#ff6600'}>Certificates</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', maxWidth: '1000px', margin: '0 auto' }}>
        {certificates.map((cert, index) => (
          <div key={index} style={{ backgroundColor: '#555', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)'; }} onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'; }}>
            <h3 style={{ color: '#ff6600', marginBottom: '0.5rem' }}>{cert.title}</h3>
            {cert.link && <a href={cert.link} style={{ color: '#ddd', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#ff6600'} onMouseLeave={(e) => e.target.style.color = '#ddd'}>View Certificate</a>}
          </div>
        ))}
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Certificates;