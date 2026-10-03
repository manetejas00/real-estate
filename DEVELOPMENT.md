# Development Guide

This project is a Vite + React site. Its published source repository is [manetejas00/real-estate](https://github.com/manetejas00/real-estate).

## Requirements

- Node.js 20.19+ (or 22.12+)
- npm
- Git

## Run locally

```bash
git clone https://github.com/manetejas00/real-estate.git
cd real-estate
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Common commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Starts the local development server with live reload. |
| `npm run build` | Creates the production-ready site in `dist/`. |
| `npm run preview` | Serves the production build locally for a final check. |

Always run `npm run build` before publishing.

## Project structure

```text
src/                              React application shell
src/components/                   Reusable React components
public/landing-pages/             Static page source and image assets
public/landing-pages/meng-to-sketchbook.html
                                  Interactive Skyline Residency page
public/landing-pages/meng-to-sketchbook/
                                  Fonts, masks, decorative art, and project plates
dist/                             Generated production output — do not edit manually
```

## Content and asset updates

- Edit project copy and plate metadata in `public/landing-pages/meng-to-sketchbook.html`.
- Keep interactive spread images at **1760 × 1240 pixels**.
- Keep replacement plates visually inside the existing sketchbook/page treatment so page-turn masking remains consistent.
- Put new static assets in `public/`; Vite copies them to `dist/` during a build.
- Do not edit files in `dist/` directly; rebuild instead.

## Git workflow

```bash
git checkout -b feature/short-description
git add .
git commit -m "Describe the change"
git push -u origin feature/short-description
```

Open a pull request on GitHub, review it, then merge into the branch used for releases.

## Static hosting deployment

1. Pull the approved release branch.
2. Run `npm ci` and `npm run build`.
3. Upload the **contents** of `dist/` to the hosting document root (often `public_html/`), not the `dist` folder itself.
4. Ensure the host serves `index.html` for the domain.
5. Open the live website and verify the home page, the page-turn interaction, mobile layout, and image loading.

Use SSH keys or host-provided secure deployment credentials. Never commit passwords, private keys, host IP addresses, or deployment commands containing credentials to this repository.

### SSH deployment template

Keep connection details in your hosting dashboard, password manager, or local environment—not in this file. Replace the placeholders only in your local terminal session:

```bash
ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST"
```

For key-based access, add the **public** key through the hosting control panel. Keep the corresponding private key only on your local computer or in an approved secret manager.

```bash
# Example only — do not commit real values.
export SSH_HOST="your-host"
export SSH_PORT="your-port"
export SSH_USER="your-user"
ssh -p "$SSH_PORT" "$SSH_USER@$SSH_HOST"
```

## Pre-release checklist

- [ ] `npm run build` completes successfully.
- [ ] The local production preview loads without missing images or fonts.
- [ ] All interactive project plates are 1760 × 1240 px.
- [ ] Page turns work without clipped corners.
- [ ] Telephone and site-visit links point to the approved production contacts.
- [ ] Production site has been checked on desktop and mobile.
