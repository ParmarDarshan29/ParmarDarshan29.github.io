import React from 'react';

const Internships = () => {
  const internships = [
    { id: 'comp-a', title: 'Company A — Software Intern', href: '/internships/company-a' },
    { id: 'comp-b', title: 'Company B — Research Intern', href: '/internships/company-b' },
  ];

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>Internships</h1>
      <ul>
        {internships.map(i => (
          <li key={i.id}>
            <a href={i.href} title={i.title}>{i.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Internships;