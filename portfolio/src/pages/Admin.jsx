import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KEYS = {
  projects: 'portfolio_projects_v1',
  skills: 'portfolio_skills_v1',
  internships: 'portfolio_internships_v1',
  activities: 'portfolio_activities_v1',
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

function normalizeImageUrl(url) {
  if (!url) return '';
  url = url.trim();
  // Google Drive share links -> direct view
  // patterns: https://drive.google.com/file/d/FILEID/view?usp=sharing
  // or https://drive.google.com/open?id=FILEID
  const driveFileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/?/);
  if (driveFileMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveFileMatch[1]}`;
  }
  const driveOpenMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveOpenMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveOpenMatch[1]}`;
  }
  // direct link already
  return url;
}

function normalizeViewUrl(url) {
  if (!url) return '';
  url = url.trim();
  // If it's a Google Drive link, prefer the 'export=view' preview form so the browser opens it
  const driveFileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/?.*/);
  if (driveFileMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveFileMatch[1]}`;
  }
  const driveOpenMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveOpenMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveOpenMatch[1]}`;
  }
  // If the URL is already a uc?export=download, switch to export=view
  const downloadMatch = url.match(/uc\?export=download&id=([a-zA-Z0-9_-]+)/);
  if (downloadMatch) {
    return `https://drive.google.com/uc?export=view&id=${downloadMatch[1]}`;
  }
  return url;
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

    // normal flow for projects/skills/internships/research

    if (section === 'skills') {
        // Accept skills as lines. Each line can be "name|imageUrl" or just "name"
        const lines = (form.skills || '').split('\n').map(l => l.trim()).filter(Boolean);
        const parsed = lines.map(l => {
          // support both '|' and ',' separators for image
          const sep = l.includes('|') ? '|' : (l.includes(',') ? ',' : null);
          if (!sep) return { name: l };
          const [name, image] = l.split(sep).map(p => p.trim());
          return { name, image: image || '' };
        });

        // existing items might be strings or objects; normalize to objects
        const existing = (items || []).map(i => (typeof i === 'string' ? { name: i } : i));

        // merge by name (case-insensitive)
        const map = new Map();
        existing.forEach(it => { map.set((it.name || '').toLowerCase(), it); });
        parsed.forEach(it => { map.set((it.name || '').toLowerCase(), { ...map.get((it.name || '').toLowerCase()), ...it }); });

        const merged = Array.from(map.values());
        save(key, merged);
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
        image: normalizeImageUrl(form.image || ''),
      };
    } else if (section === 'internships') {
      payload = {
        id: form.id || Date.now().toString(36),
        company: form.company || '',
        role: form.role || '',
        period: form.period || '',
        desc: form.desc || '',
        // image: public-facing thumbnail (Google-hosted image URL)
        image: normalizeImageUrl(form.image || ''),
  // viewUrl: link (typically a Drive share) that opens the full certificate or personal photo
  viewUrl: normalizeViewUrl(form.viewUrl || ''),
      };
    } else if (section === 'activities') {
      // images: comma separated URLs
      const imgs = (form.images || '').split(',').map(s => s.trim()).filter(Boolean).map(normalizeImageUrl);
      payload = {
        id: form.id || Date.now().toString(36),
        title: form.title || '',
        date: form.date || '',
        location: form.location || '',
        desc: form.desc || '',
        images: imgs,
  // optional view link (e.g. Drive) to view a full-size photo or certificate
  viewUrl: normalizeViewUrl(form.viewUrl || ''),
      };
    } else if (section === 'research') {
      payload = {
        id: form.id || Date.now().toString(36),
        title: form.title || '',
        summary: form.summary || '',
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        url: form.url || '',
        image: normalizeImageUrl(form.image || ''),
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
    if (section === 'activities') {
      setForm({
        ...it,
        images: (it.images || []).join(', '),
        viewUrl: it.viewUrl || '',
      });
      return;
    }
    if (section === 'research') {
      setForm({
        ...it,
        tags: it.tags ? (it.tags.join ? it.tags.join(', ') : it.tags) : '',
        image: it.image || '',
      });
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
      // items may be strings or objects { name, image }
      const next = (items || []).filter(s => {
        const name = (typeof s === 'string') ? s : (s && s.name) || '';
        return name !== idOrVal;
      });
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
      <section className="container page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 className="page-title">Admin — Sign in</h2>
        <p className="lead" style={{ textAlign: 'center' }}>This section is for admin use only. Please sign in to manage site content.</p>
        <p className="muted" style={{ marginBottom: 12, textAlign: 'center' }}>
          Enter the admin password to manage Projects, Skills, Internships and Research. Do not share this password.
        </p>

        <form onSubmit={login} className="card" style={{ maxWidth: 420, width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label className="label" style={{ textAlign: 'left' }}>Password</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ maxWidth: '100%' }} />
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
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
        <div className="admin-actions" style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => setSectionAndLoad('projects')}>Projects</button>
          <button className="btn" onClick={() => setSectionAndLoad('skills')}>Skills</button>
          <button className="btn" onClick={() => setSectionAndLoad('internships')}>Internships</button>
          <button className="btn" onClick={() => setSectionAndLoad('activities')}>Activities</button>
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
            : section === 'activities' ? (form.id ? 'Edit activity' : 'Add activity')
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
              <label className="label">Skills (one per line). Optional image: separate using a pipe — e.g. React|https://.../react.png</label>
              <textarea className="input" name="skills" value={form.skills || ''} onChange={handleChange} placeholder={"React|https://...\nJavaScript|https://...\nCSS"} required style={{ minHeight: 120 }} />
              <div className="muted" style={{ marginTop: 8 }}>Enter one skill per line. Use 'name|imageUrl' to attach an image to a skill. Editing fills this textarea with the selected entry.</div>
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

              <label className="label" style={{ marginTop: 8 }}>Certificate Image URL (optional)</label>
              <input className="input" name="image" value={form.image || ''} onChange={handleChange} placeholder="https://.../certificate.jpg" />

              <label className="label" style={{ marginTop: 8 }}>Certificate View URL (optional)</label>
              <input className="input" name="viewUrl" value={form.viewUrl || ''} onChange={handleChange} placeholder="https://drive.google.com/...?id=FILEID" />

              <label className="label" style={{ marginTop: 8 }}>Notes / Description</label>
              <textarea className="input" name="desc" value={form.desc || ''} onChange={handleChange} style={{ minHeight: 80 }} />
            </>
          )}

          {section === 'activities' && (
            <>
              <label className="label">Title</label>
              <input className="input" name="title" value={form.title || ''} onChange={handleChange} required />

              <label className="label" style={{ marginTop: 8 }}>Date</label>
              <input className="input" name="date" value={form.date || ''} onChange={handleChange} placeholder="e.g. 2024-08-15 or Aug 2024" />

              <label className="label" style={{ marginTop: 8 }}>Location (optional)</label>
              <input className="input" name="location" value={form.location || ''} onChange={handleChange} />

              <label className="label" style={{ marginTop: 8 }}>Image URLs (comma separated)</label>
              <input className="input" name="images" value={form.images || ''} onChange={handleChange} placeholder="https://.../img1.jpg, https://.../img2.jpg" />

              <label className="label" style={{ marginTop: 8 }}>View URL (optional) — e.g. Drive link to full photo/certificate</label>
              <input className="input" name="viewUrl" value={form.viewUrl || ''} onChange={handleChange} placeholder="https://drive.google.com/...?id=FILEID" />

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

              <label className="label" style={{ marginTop: 8 }}>Image URL (optional)</label>
              <input className="input" name="image" value={form.image || ''} onChange={handleChange} />

              <label className="label" style={{ marginTop: 8 }}>Tags (comma separated)</label>
              <input className="input" name="tags" value={form.tags || ''} onChange={handleChange} />

              <label className="label" style={{ marginTop: 8 }}>URL (paper / repo)</label>
              <input className="input" name="url" value={form.url || ''} onChange={handleChange} />
            </>
          )}

          {section === 'about' && (
            <>
              <label className="label">About admin note (public)</label>
              <textarea className="input" name="aboutText" value={form.aboutText || ''} onChange={handleChange} style={{ minHeight: 120 }} />
              <div className="muted" style={{ marginTop: 8 }}>This text is displayed in the public About page as the admin note.</div>
            </>
          )}

          <div style={{ marginTop: 12 }}>
            <button className="btn primary" type="submit">{section === 'skills' ? 'Add / Merge skills' : section === 'about' ? 'Save about note' : (form.id ? 'Save changes' : 'Add')}</button>
          </div>
        </form>

        {/* List */}
        <div className="card">
          <h3 style={{ marginTop: 0, marginBottom: 8 }}>{section === 'projects' ? 'Projects' : section === 'skills' ? 'Skills' : section === 'internships' ? 'Internships' : section === 'activities' ? 'Activities' : 'Research'}</h3>
          <div style={{ display: 'grid', gap: 10 }}>
            {items.length === 0 && <div className="muted">No entries yet.</div>}

            {section === 'skills' && items.map((s) => {
              const key = (typeof s === 'string') ? s : s.name;
              return (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    { (s && s.image) ? <img src={s.image} alt={s.name || s} style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6, border: '1px solid rgba(255,255,255,0.04)' }} /> : null }
                    <div>{typeof s === 'string' ? s : s.name}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn" onClick={() => { setForm({ skills: (typeof s === 'string') ? s : `${s.name}|${s.image || ''}` }); }}>Edit</button>
                    <button className="btn" onClick={() => remove(typeof s === 'string' ? s : s.name)}>Delete</button>
                  </div>
                </div>
              );
            })}

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
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {it.image ? (
                    <a href={it.image} target="_blank" rel="noreferrer"><img src={it.image} alt={`${it.company} certificate`} style={{ width: 84, height: 66, objectFit: 'cover', borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)' }} /></a>
                  ) : null}
                  <div>
                    <strong>{it.company}</strong> <span className="muted">— {it.role}</span>
                    <div className="muted">{it.period}</div>
                    <div style={{ marginTop: 6 }}>{it.desc}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {it.viewUrl ? <a className="btn" href={it.viewUrl} target="_blank" rel="noreferrer">View</a> : null}
                  <button className="btn" onClick={() => edit(it)}>Edit</button>
                  <button className="btn" onClick={() => remove(it.id)}>Delete</button>
                </div>
              </div>
            ))}

            {section === 'activities' && items.map(a => (
              <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {a.images && a.images.length > 0 ? (
                    <a href={a.images[0]} target="_blank" rel="noreferrer"><img src={a.images[0]} alt={a.title} style={{ width: 84, height: 66, objectFit: 'cover', borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)' }} /></a>
                  ) : null}
                  <div>
                    <strong>{a.title}</strong> <span className="muted">— {a.date} {a.location ? `· ${a.location}` : ''}</span>
                    <div style={{ marginTop: 6 }}>{a.desc}</div>
                    {a.images && a.images.length > 1 ? (
                      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                        {a.images.slice(0,4).map((img, idx) => (
                          <a key={idx} href={img} target="_blank" rel="noreferrer"><img src={img} alt={`${a.title} ${idx+1}`} style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 6, border: '1px solid rgba(255,255,255,0.04)' }} /></a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {a.viewUrl ? <a className="btn" href={a.viewUrl} target="_blank" rel="noreferrer">View</a> : null}
                  <button className="btn" onClick={() => edit(a)}>Edit</button>
                  <button className="btn" onClick={() => remove(a.id)}>Delete</button>
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