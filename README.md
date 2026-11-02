# ONEVO — Official Public Launch Website

> **"One profile. Endless connections."**

The official public launch website for **ONEVO**, a modern Android digital identity and contact-sharing application.

---

## 1. GitHub Pages & Static Hosting Compatibility

The website is 100% self-contained and pre-configured for GitHub Pages, Netlify, and custom domains:

- **Self-Contained Inline SVG Logos:**
  The ONEVO brand logo is directly embedded as scalable inline SVG in the Navbar, Hero, and Footer. This completely prevents 404 errors, broken image icons, or subpath resolution issues on GitHub Pages (`username.github.io/repo-name/`).
- **`.nojekyll` File Included:**
  An empty `.nojekyll` file is present in the repository root. This tells GitHub Pages to disable Jekyll processing, ensuring all folders (including `assets/` and `public/apk/`) are published without being filtered or ignored.
- **Data URI Favicon Fallback:**
  The `<head>` includes an inline data-URI vector favicon, guaranteeing that your browser tab icon displays instantly on any domain or subpath.
- **Official GitHub Releases Distribution:**
  Download buttons are configured with the official direct download URL from GitHub Releases (`https://github.com/sonusapien/ONEVO/releases/download/v1.0.0/release.apk`), eliminating the need to host large binaries directly in static web repo trees.

---

## 2. Official Release APK

The website provides direct download CTAs in the Header, Hero, Download Section, Mobile Drawer, and Footer.

All download buttons point to the official GitHub Release asset:
```
https://github.com/sonusapien/ONEVO/releases/download/v1.0.0/release.apk
```

---

## 3. Configuring Release Metadata in `script.js`

All release metadata is centralized in `script.js` inside the `ONEVO_RELEASE_CONFIG` object:

```javascript
const ONEVO_RELEASE_CONFIG = {
  appName: "ONEVO",
  tagline: "One profile. Endless connections.",
  apkDownloadUrl: "https://github.com/sonusapien/ONEVO/releases/download/v1.0.0/release.apk",
  apkFileName: "ONEVO.apk",
  version: "1.0.0",
  releaseDate: "Official Public Release 2026",
  fileSize: null, // Set to string e.g. "18.4 MB" only when verified; otherwise hidden
  compatibility: "Android 8.0 (API 26) or newer",
  distributionNotice: "Official release distributed directly by ONEVO via GitHub Releases."
};
```

---

## 4. Deploying to GitHub Pages

1. Push this entire folder to your GitHub repository (e.g., `onevo-launch`).
2. Go to your repository **Settings** > **Pages** (under the "Code and automation" section).
3. Under **Branch**, select `main` (or `master`), select folder `/ (root)`, and click **Save**.
4. GitHub Pages will build and deploy the site at `https://<your-username>.github.io/<your-repo>/`.
5. Because the logos are embedded directly as inline SVG and `.nojekyll` is included, all logos, icons, animations, and styles will display without broken image icons.

---

## 5. Local Development & Preview

Run with Python 3:
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.
