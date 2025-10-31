import React from 'react';

const Certificates = () => {
  const certs = [
    { id: 'ml', title: 'Machine Learning — Certificate', href: '/certificates/machine-learning' },
    { id: 'ds', title: 'Data Science — Certificate', href: '/certificates/data-science' },
    { id: 'ai-health', title: 'AI in Healthcare — Certificate', href: '/certificates/ai-healthcare' },
  ];

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>Certificates</h1>
      <ul>
        {certs.map(c => (
          <li key={c.id}>
            <a href={c.href} title={c.title}>{c.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Certificates;