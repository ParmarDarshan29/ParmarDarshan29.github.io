const About = () => {
  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#222', color: '#fff', padding: '2rem' }}>
      <h1 style={{ color: '#ff6600', fontSize: '2.5rem', marginBottom: '1rem' }}>About Me</h1>
      <p style={{ color: '#ccc', fontSize: '1.2rem', lineHeight: '1.8' }}>
        I am Darshan Parmar, a Computer Engineering student at Government Engineering College, Bharuch. My passion lies in Data Science, Machine Learning, and AI, particularly in healthcare applications. Through projects like suRxit and Brain Tumor Detection, I've gained hands-on experience in building scalable ML pipelines and medical imaging frameworks. My research on EEG-based PTSD diagnosis highlights my commitment to ethical and interpretable AI.
      </p>
      <h2 style={{ color: '#ff6600', fontSize: '2rem', marginTop: '2rem' }}>Leadership Experience</h2>
      <ul style={{ color: '#ccc', fontSize: '1.2rem', lineHeight: '1.8' }}>
        <li><strong>Department Coordinator, TechTonic 2k24:</strong> Led department event operations, coordinating teams and schedules for technical competitions and workshops.</li>
        <li><strong>Lead Coordinator, Finance/Budget Committee, TechTonic 2k25:</strong> Managed budgeting, procurement, and expense tracking for a national-level techfest; optimized resource allocation and maintained financial records.</li>
        <li><strong>IEEE SB Treasurer:</strong> Handled budgeting, fund management, and reporting for IEEE technical events; aligned financial planning with tech initiatives.</li>
      </ul>
      <p style={{ color: '#ccc', fontSize: '1.2rem' }}>
        Bharuch, Gujarat | +91 8141902382 | connect.darshanparmar@gmail.com
      </p>
    </div>
  );
};

export default About;