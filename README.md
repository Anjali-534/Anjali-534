# 🚀 Alex Morgan — Portfolio Website

A premium, futuristic portfolio built with React.js, Tailwind CSS, and modern web technologies.

## ✨ Features

- **9 Pages**: Home, About, Projects, Skills, Resume, Library, Activities, Hobbies, Contact
- **Dark/Light Mode Toggle** — persisted in localStorage
- **Particle Background Animation** — canvas-based networked particles
- **Typing Animation** — role cycling with typewriter effect
- **Project Filter + Modal** — category filtering and detailed modal popups
- **Animated Progress Bars** — scroll-triggered skill indicators
- **Timeline Layout** — for experience and activities
- **Contact Form** — with validation and success/error states
- **Google Maps Embed** — location display
- **Glassmorphism UI** — frosted glass cards throughout
- **Responsive** — mobile-first design for all breakpoints
- **Sticky Navbar** — with blur effect and active route detection
- **SEO Meta Tags** — Open Graph and Twitter Card support

## 🛠️ Tech Stack

- **React 18** with functional components & hooks
- **React Router v6** for client-side navigation
- **Tailwind CSS** for utility-first styling
- **Custom CSS** for animations, glassmorphism, gradient effects
- **React Icons** for iconography
- **Canvas API** for particle background (no library dependency)

## 📁 Folder Structure

```
portfolio/
├── public/
│   └── index.html            # SEO meta tags
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   └── Navbar.jsx    # Sticky navbar with mobile menu
│   │   ├── Footer/
│   │   │   └── Footer.jsx    # Footer with quick links
│   │   └── UI/
│   │       └── index.jsx     # Reusable: SectionHeader, GlassCard, ProgressBar, etc.
│   ├── context/
│   │   └── ThemeContext.jsx  # Dark/Light mode context
│   ├── data/
│   │   └── portfolioData.js  # All content data (projects, skills, etc.)
│   ├── hooks/
│   │   └── useAnimations.js  # Custom hooks: useTypingEffect, useScrollReveal, useTilt
│   ├── pages/
│   │   ├── HomePage.jsx      # Hero + particles + CTA
│   │   ├── AboutPage.jsx     # Profile + timeline + highlights
│   │   ├── ProjectsPage.jsx  # Grid + filter + modal
│   │   ├── SkillsPage.jsx    # Tabs + animated bars
│   │   ├── ResumePage.jsx    # Resume preview + download
│   │   ├── LibraryPage.jsx   # Books + courses + learning
│   │   ├── ActivitiesPage.jsx # Timeline achievements
│   │   ├── HobbiesPage.jsx   # Interactive hobby cards
│   │   └── ContactPage.jsx   # Form + map + socials
│   ├── App.jsx               # Router setup
│   ├── index.js              # Entry point
│   └── index.css             # Global styles + Tailwind
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🚀 Getting Started

```bash
# 1. Clone or download the project
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Build for production
npm run build
```

## 🎨 Customization

1. **Your Info** → Edit `src/data/portfolioData.js`
   - `personalInfo` — name, email, bio, social links
   - `experiences` — work & education timeline
   - `projects` — your projects with images and links
   - `skills` — categorized tech skills with levels
   - `books`, `courses`, `activities`, `hobbies`

2. **Colors** → Edit CSS variables in `src/index.css` and `tailwind.config.js`

3. **Resume PDF** → Replace `/public/resume.pdf` with your actual resume

4. **Contact Form** → Integrate EmailJS:
   ```bash
   npm install @emailjs/browser
   ```
   Then in `ContactPage.jsx`, replace the simulated API call:
   ```js
   import emailjs from '@emailjs/browser';
   await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY');
   ```

5. **Profile Image** → Replace the Unsplash URL in `personalInfo.avatar`

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px – 1024px  
- **Desktop**: > 1024px

## 🌐 Deployment

```bash
# Vercel (recommended)
npm i -g vercel
vercel

# Netlify
npm run build
# Upload the build/ folder to Netlify
```

---

Built with ❤️ by Alex Morgan

service id- service_137rg3r