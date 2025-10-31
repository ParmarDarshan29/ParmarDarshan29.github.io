import React from 'react';

const Research = () => {
  const items = [
    { id: 'eeg-ptsd', title: 'EEG-based PTSD Diagnosis — Paper & summary', href: '/research/eeg-ptsd' },
    { id: 'brain-tumor', title: 'Brain Tumor Detection — Project', href: '/research/brain-tumor' },
  ];

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>Research</h1>
      <ul>
        {items.map(it => (
          <li key={it.id}>
            <a href={it.href} title={it.title}>{it.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Research;