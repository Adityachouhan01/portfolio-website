# Aditya Chouhan — Portfolio

Premium dark engineering portfolio for a Full-Stack Developer and DevOps Engineer.

## Stack

React, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Framer Motion, Lucide.

## Scripts

```bash
# Install dependencies
npm install

# Local development
npm run dev

# Production build
npm run build

# Typecheck
npm run typecheck

# Lint
npm run lint
```

## Content

Portfolio copy lives in `src/data/`:

- `site.ts` — name, links, availability, SEO
- `experience.ts` — roles, education, certifications, services
- `projects.ts` — project cards and modal content
- `skills.ts` — skill groups and stack cards

Replace `public/Aditya-Chouhan-Resume.pdf` with the official resume. The Download Resume button already points to that file.

## Notes

- The contact form is frontend-only until an email backend is connected.
- Accenture responsibilities are left as a placeholder and should not be invented.
- GitHub / live demo buttons stay in a coming-soon state until real URLs are added in `src/data/projects.ts`.
