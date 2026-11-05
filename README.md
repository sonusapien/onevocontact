# ONEVO Contact — Official Landing Page

> **"One profile. Endless connections."**

The official, production-ready landing page for **ONEVO Contact** (`onevocontact`), built with the exact visual design language, UI styling, typography, spacing, colour system, component appearance, and overall tactile aesthetic of the reference site **[sonusapien.github.io/onevocontact](https://sonusapien.github.io/onevocontact/)**.

Built strictly using pure **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)** with zero frontend frameworks, zero build steps, and zero external runtime dependencies.

---

## 1. Design System & Aesthetic Foundation

- **Warm Canvas & Neutrals:**
  - Canvas: `#fffaf0`
  - Soft Surface: `#faf5e8`
  - Card Surface: `#f5f0e0`
  - Dark Surface: `#0a1a1a` / `#162a2a`
  - Ink: `#0a0a0a`
  - Body Text: `#3a3a3a`
  - Muted Text: `#6a6a6a`
  - Hairline Borders: `#e5dfd3`
- **Pop-Pastel Bento Accents:**
  - Violet: `#b8a4ed` / Deep Violet: `#6557FF`
  - Sky: `#a7c7e7` / Deep Sky: `#278BFF`
  - Pink: `#ff4d8b`
  - Peach: `#ffb084`
  - Ochre: `#e8b94a`
  - Mint: `#a4d4c5`
  - Lavender: `#e9d5ff`
  - Lilac: `#d8b4e2`
  - Emerald: `#10B981`
- **Typography:**
  - Display & Headings: `'Unbounded', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  - Body Text: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Tactile 3D Buttons & Components:**
  - Pill-shaped tactile buttons (`border: 2px solid var(--ink); border-radius: 9999px;`)
  - Tactile offset drop shadow (`box-shadow: 4px 4px 0px var(--ink);`)
  - Active press depression (`transform: translate(2px, 2px); box-shadow: 2px 2px 0px var(--ink);`)
  - Smooth dynamic ripple feedback on click.

---

## 2. Page Structure & Features

1. **Sticky Header / Navbar (`#navbar`):**
   - Translucent blur navbar with scroll threshold activation.
   - Vector gradient brand logo and Unbounded wordmark.
   - Center navigation: Features, How it works, Privacy, Support ☕, FAQ.
   - Right action: Tactile 3D "Download onevocontact APK" button.
   - Accessible mobile hamburger toggle and full-screen drawer (`.mobile-drawer`).

2. **Hero Section (`.hero`):**
   - Animated SVG emblem with rotating gradient accent.
   - Main headline: `One profile.<br>Endless connections.`.
   - Subtitle & dual CTA buttons (Primary APK Download + Secondary Explore).
   - Android APK notice with pulsating status dot.

3. **Value Ticker Ribbon (`.ticker`):**
   - Marquee highlights: Direct Official APK, Proximity NameLink, Total Privacy Control, Zero-Friction QR & Nearby.

4. **Infinite Screenshots Marquee (`.screenshots`):**
   - Continuous horizontal marquee containing authentic CSS device frames:
     * Screen 1: Digital Contact Profile
     * Screen 2: Universal vCard 3.0 QR Code
     * Screen 3: onevocontact Nearby Wireless Radar
     * Screen 4: NameLink Proximity Dual Cards
     * Screen 5: Selective Granular Privacy Toggles
     * Screen 6: Saved Connections Address Book

5. **Features Bento Grid (`#features`):**
   - Bento 1: QR Profile Sharing (Violet card)
   - Bento 2: Universal Standard (Sky card)
   - Bento 3: NameLink Proximity with live interactive simulator (`#nl-sim-trigger`)
   - Bento 4: Nearby Wireless Sharing (Mint card)
   - Bento 5: Selective Sharing & Granular Privacy (Peach card)
   - Bento 6: Address Book Connections (Lilac card)

6. **How It Works (`#how-it-works`):**
   - 3 tactile sequence cards:
     1. Create your digital card
     2. Choose how you share
     3. Connect seamlessly

7. **Privacy Section (`#privacy`):**
   - Dark tactile card (`.privacy-card.surface-dark`) explaining 100% on-device storage, zero cloud databases, no analytics, and full local export/deletion control.

8. **Buy the Creator a Coffee ☕ (`#coffee`):**
   - Dedicated creator support section placed directly before the final download section.
   - Matches the exact typography, background, tactile buttons, and spacing of the reference.
   - "Buy Me a Coffee" button triggers the centered `#modal-coffee` dialog.

9. **Download Closing Section (`#download`):**
   - Dark tactile container with verified APK badge and comprehensive release metadata (v1.0.1, Android 8.0+, SHA-256 verified).

10. **FAQ Accordion (`#faq`):**
    - 8 interactive accordion items with expandable `+` / `−` toggle patterns.

11. **Footer:**
    - 2-column editorial grid, brand disclaimer, navigation links, direct APK download, legal links, and Support Creator link.

12. **Floating Support FAB (`#support-fab`):**
    - Corner floating action button ("Need help installing?") triggering the Android Installation Guide.

13. **Accessible Modals:**
    - Privacy Policy modal (`#modal-privacy`)
    - Install Guide modal (`#modal-install-guide`)
    - Terms of Use modal (`#modal-terms`)
    - Creator Support / Coffee modal (`#modal-coffee`)

---

## 3. Official Release APK

All download buttons and triggers point strictly to the centralized release asset:

```javascript
const DOWNLOAD_URL = "https://github.com/sonusapien/onevocontact/releases/download/v.1.0.1/release.apk";
```

- Direct APK download in the same tab (`target="_self"`).
- Zero fake progress bars, zero timers, zero deceptive monetization gates.

---

## 4. Creator Support & UPI Payment Modal (`#modal-coffee`)

The Coffee payment modal follows the exact tactile modal architecture (`.modal-overlay`, `.modal-window`, `.modal-close-btn`):

```javascript
const COFFEE_CONFIG = {
  upiId: "sonusapien@fam",
  payeeName: "ONEVO Creator",
  amount: "89.00",
  currency: "INR",
  paymentUri: "upi://pay?pa=sonusapien%40fam&pn=ONEVO%20Creator&am=89.00&cu=INR"
};
```

- **Fixed Amount:** Prominently displays ₹89 (strictly non-editable; no inputs or dropdowns).
- **Scannable QR Code:** Clean vector SVG (`assets/images/upi-qr.svg`) generated directly from `COFFEE_CONFIG.paymentUri` on a high-contrast white background.
- **UPI Deep Link:** "Pay via UPI (₹89)" button directly invoking the native `upi://` URI intent for Android devices.
- **Copy UPI ID:** 1-click clipboard copy for `sonusapien@fam` with instant visual toast feedback.
- **Dismissal:** Accessible closing via close icon (`✕`), clicking outside the dialog window, or pressing the `Escape` key.
- **Scroll Lock:** Automatically locks background body scrolling while the modal is open.

---

## 5. Local Testing & Live Server

Run with VS Code Live Server (right click `index.html` > "Open with Live Server") or Python 3:

```bash
python -m http.server 8000
```
Open `http://localhost:8000` in any browser.

---

## 6. Deployment

Fully self-contained and pre-configured for GitHub Pages, Netlify, and custom domains:
- Includes `.nojekyll` for GitHub Pages.
- Pure static HTML/CSS/JS with zero build steps.

---

## 7. Copyright

© 2026 onevocontact. All rights reserved.
