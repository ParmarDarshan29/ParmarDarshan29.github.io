import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KEYS = {
  projects: 'portfolio_projects_v1',
  skills: 'portfolio_skills_v1',
  internships: 'portfolio_internships_v1',
  research: 'portfolio_research_v1',
};
const AUTH_KEY = 'portfolio_admin_auth_v1';
const ENV_PASS = process.env.REACT_APP_ADMIN_PASSWORD || '';

function load(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function save(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [section, setSection] = useState('projects'); // projects | skills | internships | research
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const ok = sessionStorage.getItem(AUTH_KEY) === '1';
    setAuthenticated(ok);
    if (ok) setItems(load(KEYS[section]));
  }, [section]);

  const login = (e) => {
    e.preventDefault();
    if (!ENV_PASS) {
      alert('Admin password is not set. Create REACT_APP_ADMIN_PASSWORD in .env and restart.');
      return;
    }
    if (password === ENV_PASS) {
      sessionStorage.setItem(AUTH_KEY, '1');
      setAuthenticated(true);
      setItems(load(KEYS[section]));
      setPassword('');
    } else {
      alert('Invalid password');
    }
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
    navigate('/');
  };

  const setSectionAndLoad = (s) => {
    setSection(s);
    setForm({});
    setItems(load(KEYS[s]));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Generic add/edit for list-based entries
  const submitItem = (e) => {
    e.preventDefault();
    const key = KEYS[section];
    let payload;

    if (section === 'skills') {
      // skills stored as array of strings
      const newSkills = (form.skills || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      // merge unique (keep existing + new)
      const merged = Array.from(new Set([...(items || []), ...newSkills]));
      save(key, merged);
      // reload from storage to ensure consistent format
      const reloaded = load(key);
      setItems(reloaded);
      setForm({});
      return;
    }

    if (section === 'projects') {
      payload = {
        id: form.id || Date.now().toString(36),
        title: form.title || '',
        desc: form.desc || '',
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        url: form.url || '',
        image: form.image || '',
      };
    } else if (section === 'internships') {
      payload = {
        id: form.id || Date.now().toString(36),
        company: form.company || '',
        role: form.role || '',
        period: form.period || '',
        desc: form.desc || '',
      };
    } else if (section === 'research') {
      payload = {
        id: form.id || Date.now().toString(36),
        title: form.title || '',
        summary: form.summary || '',
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        url: form.url || '',
      };
    }

    const next = [...items.filter(i => i.id !== payload.id), payload];
    setItems(next);
    save(key, next);
    setForm({});
  };

  const edit = (it) => {
    if (section === 'skills') {
      setForm({ skills: (it || []).join(', ') });
      return;
    }
    setForm({
      ...it,
      tags: it.tags ? (it.tags.join ? it.tags.join(', ') : it.tags) : '',
      skills: undefined,
    });
  };

  const remove = (idOrVal) => {
    const key = KEYS[section];
    if (!window.confirm('Remove this entry?')) return;
    if (section === 'skills') {
      const next = (items || []).filter(s => s !== idOrVal);
      setItems(next);
      save(key, next);
      return;
    }
    const next = items.filter(i => i.id !== idOrVal);
    setItems(next);
    save(key, next);
  };

  if (!authenticated) {
    return (
      <section className="container page">
        <h2 className="page-title">Admin — Sign in</h2>
        <p className="lead">This area is for Darshan Parmar only — you can explore other parts of the site freely.</p>
        <p className="muted" style={{ marginBottom: 12 }}>
          Enter the admin password to manage Projects, Skills, Internships and Research.
        </p>

        <form onSubmit={login} className="card" style={{ maxWidth: 560 }}>
          <label className="label">Password</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <div style={{ marginTop: 12 }}>
            <button className="btn primary" type="submit">Sign in</button>
          </div>
        </form>
      </section>
    );
  }

  return (
    <section className="container page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <h2 className="page-title">Admin — Manage content</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => setSectionAndLoad('projects')}>Projects</button>
          <button className="btn" onClick={() => setSectionAndLoad('skills')}>Skills</button>
          <button className="btn" onClick={() => setSectionAndLoad('internships')}>Internships</button>
          <button className="btn" onClick={() => setSectionAndLoad('research')}>Research</button>
          <button className="btn" onClick={logout}>Sign out</button>
        </div>
      </div>

      <div style={{ marginTop: 16, display: 'grid', gap: 16 }}>
        {/* Form */}
        <form onSubmit={submitItem} className="card" style={{ maxWidth: 900 }}>
          <h3 style={{ marginTop: 0 }}>{section === 'projects' ? (form.id ? 'Edit project' : 'Add project')
            : section === 'skills' ? 'Add / Edit skills'
            : section === 'internships' ? (form.id ? 'Edit internship' : 'Add internship')
            : (form.id ? 'Edit research' : 'Add research')}</h3>

          {section === 'projects' && (
            <>
              <label className="label">Title</label>
              <input className="input" name="title" value={form.title || ''} onChange={handleChange} required />

              <label className="label" style={{ marginTop: 8 }}>Description</label>
              <textarea className="input" name="desc" value={form.desc || ''} onChange={handleChange} style={{ minHeight: 80 }} />

              <label className="label" style={{ marginTop: 8 }}>Tags (comma separated)</label>
              <input className="input" name="tags" value={form.tags || ''} onChange={handleChange} />

              <label className="label" style={{ marginTop: 8 }}>Project URL</label>
              <input className="input" name="url" value={form.url || ''} onChange={handleChange} />

              <label className="label" style={{ marginTop: 8 }}>Image URL (optional)</label>
              <input className="input" name="image" value={form.image || ''} onChange={handleChange} />
            </>
          )}

          {section === 'skills' && (
            <>
              <label className="label">Skills (comma separated)</label>
              <input className="input" name="skills" value={form.skills || ''} onChange={handleChange} placeholder="React, JavaScript, CSS" required />
              <div className="muted" style={{ marginTop: 8 }}>Adding duplicates is prevented; use commas to add multiple skills.</div>
            </>
          )}

          {section === 'internships' && (
            <>
              <label className="label">Company</label>
              <input className="input" name="company" value={form.company || ''} onChange={handleChange} required />

              <label className="label" style={{ marginTop: 8 }}>Role</label>
              <input className="input" name="role" value={form.role || ''} onChange={handleChange} />

              <label className="label" style={{ marginTop: 8 }}>Period</label>
              <input className="input" name="period" value={form.period || ''} onChange={handleChange} />

              <label className="label" style={{ marginTop: 8 }}>Notes / Description</label>
              <textarea className="input" name="desc" value={form.desc || ''} onChange={handleChange} style={{ minHeight: 80 }} />
            </>
          )}

          {section === 'research' && (
            <>
              <label className="label">Title</label>
              <input className="input" name="title" value={form.title || ''} onChange={handleChange} required />

              <label className="label" style={{ marginTop: 8 }}>Summary</label>
              <textarea className="input" name="summary" value={form.summary || ''} onChange={handleChange} style={{ minHeight: 80 }} />

              <label className="label" style={{ marginTop: 8 }}>Tags (comma separated)</label>
              <input className="input" name="tags" value={form.tags || ''} onChange={handleChange} />

              <label className="label" style={{ marginTop: 8 }}>URL (paper / repo)</label>
              <input className="input" name="url" value={form.url || ''} onChange={handleChange} />
            </>
          )}

          <div style={{ marginTop: 12 }}>
            <button className="btn primary" type="submit">{(section === 'skills') ? 'Add / Merge skills' : (form.id ? 'Save changes' : 'Add')}</button>
          </div>
        </form>

        {/* List */}
        <div className="card">
          <h3 style={{ marginTop: 0, marginBottom: 8 }}>{section === 'projects' ? 'Projects' : section === 'skills' ? 'Skills' : section === 'internships' ? 'Internships' : 'Research'}</h3>
          <div style={{ display: 'grid', gap: 10 }}>
            {items.length === 0 && <div className="muted">No entries yet.</div>}

            {section === 'skills' && items.map(s => (
              <div key={s} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>{s}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn" onClick={() => { setForm({ skills: s }); }}>Edit</button>
                  <button className="btn" onClick={() => remove(s)}>Delete</button>
                </div>
              </div>
            ))}

            {section === 'projects' && items.map(p => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                <div>
                  <strong>{p.title}</strong>
                  <div className="muted">{(p.tags || []).join(', ')}</div>
                  <div style={{ marginTop: 6 }}>{p.url ? <a className="link" href={p.url} target="_blank" rel="noreferrer">Link</a> : <span className="muted">No link</span>}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn" onClick={() => edit(p)}>Edit</button>
                  <button className="btn" onClick={() => remove(p.id)}>Delete</button>
                </div>
              </div>
            ))}

            {section === 'internships' && items.map(it => (
              <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                <div>
                  <strong>{it.company}</strong> <span className="muted">— {it.role}</span>
                  <div className="muted">{it.period}</div>
                  <div style={{ marginTop: 6 }}>{it.desc}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn" onClick={() => edit(it)}>Edit</button>
                  <button className="btn" onClick={() => remove(it.id)}>Delete</button>
                </div>
              </div>
            ))}

            {section === 'research' && items.map(r => (
              <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                <div>
                  <strong>{r.title}</strong>
                  <div className="muted">{(r.tags || []).join(', ')}</div>
                  <div style={{ marginTop: 6 }}>{r.summary}</div>
                  <div style={{ marginTop: 6 }}>{r.url ? <a className="link" href={r.url} target="_blank" rel="noreferrer">Link</a> : null}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn" onClick={() => edit(r)}>Edit</button>
                  <button className="btn" onClick={() => remove(r.id)}>Delete</button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}