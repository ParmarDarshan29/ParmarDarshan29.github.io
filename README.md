# Darshan Parmar — Portfolio

This repository contains the source for a React-based personal portfolio site located in the `portfolio/` folder.

Summary
- React (Create React App)
- Client-side admin UI (edits stored in localStorage)
- Deploys as a static site (GitHub Pages / Netlify / Vercel)

What's in the repo
- `/portfolio` — the React application (source code in `portfolio/src`, public assets in `portfolio/public`).

Quick start (development)
1. Install dependencies

```bash
cd portfolio
npm install
```

2. Run the dev server

```bash
npm start
```

The app will open at http://localhost:3000 by default.

Build (production)

```bash
cd portfolio
npm run build
```

This produces an optimized static build in `portfolio/build`.

Deploying to GitHub Pages (project site)

This project already includes a workflow and scripts to publish the `portfolio/build` folder to the `gh-pages` branch.

- Local quick deploy (one-off):

```bash
cd portfolio
npm install   # make sure devDependencies (gh-pages) are installed
npm run deploy
```

- CI-based deploy (recommended): push to `main`. A GitHub Action (`.github/workflows/deploy.yml`) is included which builds `portfolio` and publishes `portfolio/build` to `gh-pages` (it also creates a `.nojekyll` marker so GitHub Pages won't run Jekyll over the published files).

After deployment the project site will be available at:

```
https://ParmarDarshan29.github.io/portfolio
```

Or, if you prefer a user site at `https://ParmarDarshan29.github.io`, change the `homepage` field in `portfolio/package.json` and follow the same deploy flow (or publish the built files to the repo root/docs and configure Pages accordingly).

Admin interface
- The app contains a small client-side admin at `/admin` that saves content to localStorage.
- To enable admin features you'll need to set an admin password via an environment variable when running locally or in CI:

```
REACT_APP_ADMIN_PASSWORD=yourpassword
```

- Admin authentication state is stored in `sessionStorage` under the key `portfolio_admin_auth_v1`.

Local data keys (localStorage)
- Projects: `portfolio_projects_v1`
- Skills: `portfolio_skills_v1`
- Internships: `portfolio_internships_v1`
- Research: `portfolio_research_v1`
- About: `portfolio_about_v1`

Images and certificates
- The Admin allows you to paste image URLs for skills, internships (certificate thumbnails), and projects. Those images must be publicly accessible URLs.
- If you prefer to store images inside the repo, put them in `portfolio/public/` (for example `portfolio/public/darshan.jpg`) and reference them in the app using `process.env.PUBLIC_URL` (the app already references `/darshan.jpg`).

Troubleshooting GitHub Pages (Jekyll errors)
- If GitHub Pages attempts to run Jekyll and throws Liquid syntax errors, ensure you're publishing the built static files (the `gh-pages` branch) and that a `.nojekyll` file exists at the root of the published site. The included workflow places a `.nojekyll` file in `portfolio/build` before deployment.

Other hosting options
- Netlify, Vercel, and Cloudflare Pages are excellent alternatives — connect the repo and set the build command to `npm run build` and publish directory to `portfolio/build`.

Contributing & notes
- This repo uses Create React App. Keep edits to the `portfolio/src` folder.
- After changing `homepage` in `package.json`, rebuild before deploying so asset URLs are correct.

License
- This repository uses the license in `LICENSE` at the repo root.

Questions or help
- If you'd like, I can push the workflow, run deploy from this environment (requires git credentials), or help debug any CI logs you see — paste the failing step logs and I'll help.
# my_portfolio

portfolio/
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Skills.jsx
│   │   ├── Education.jsx
│   │   ├── Certificates.jsx
│   │   ├── Research.jsx
│   │   ├── Internships.jsx
│   │   └── About.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   └── main.jsx
└── package.json

I build meaningful, interpretable, and performance-focused AI and web experiences.

Hi I'm Darshan Parmar, a Computer Engineering student and AI enthusiast from Government Engineering College, Bharuch, affiliated with Gujarat Technological University. My work bridges Machine Learning, Deep Learning, and Explainable AI (XAI) to create transparent and equitable intelligent systems — particularly in healthcare.

Focus
Explainable AI & Model Interpretability
EEG and Medical Image Analysis
Web & AI System Integration

Short Bio
I love transforming complex research ideas into real-world, accessible solutions. Currently, I’m researching interpretable PTSD diagnosis using EEG data and developing robust AI-driven healthcare tools that enhance clinical trust and decision-making.

Beyond AI, I’m interested in building sleek, performant web interfaces and exploring how design and data can work together to create better digital experiences.

Education
B.E. in Computer Engineering
Government Engineering College, Bharuch
(Expected Graduation: 2026)

Location
Remote / Bharuch, Gujarat