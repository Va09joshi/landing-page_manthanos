<div align="center">
  <a href="https://manthanos.app">
    <img src="./public/logo.png" alt="ManthanOS" width="360" />
  </a>

  <br />
  <br />

  **One workspace for ideas, projects, clients, and content.**

  The public website for ManthanOS—a connected operating system for creator teams,
  agencies, and companies.

  [Visit the website](https://manthanos.app) · [Explore features](https://manthanos.app/features) · [Request a demo](https://manthanos.app/request-demo)
</div>

## About

This repository contains the public-facing ManthanOS experience. It introduces the product, explains its workflows, publishes product updates, and connects prospective teams with the ManthanOS platform.

ManthanOS brings ideas, projects, tasks, clients, meetings, and content into one workspace, with ownership, approvals, permissions, and handoffs built in.

## What is included

- Product landing page with interactive workflow sections
- Feature, use-case, pricing, and company pages
- Public blog with dynamic article routes
- Workspace application and demo-request flows
- Login, registration, and invitation acceptance entry points
- SEO metadata and structured data for search and social sharing
- Responsive motion, 3D, and illustration-based product storytelling

## Built with

- [Next.js 16](https://nextjs.org/) and the App Router
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Motion](https://motion.dev/) for interface animation
- [React Three Fiber](https://r3f.docs.pmnd.rs/) and [Three.js](https://threejs.org/) for 3D experiences
- [Lucide](https://lucide.dev/) for interface icons

## Getting started

### Prerequisites

- Node.js 20.9 or newer
- npm
- A running ManthanOS API for forms, authentication, and blog content

### Installation

```bash
cd manthanos-public
npm install
```

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

`NEXT_PUBLIC_API_URL` is also supported for compatibility. If neither variable is set during local development, the app uses `http://localhost:5000/api`. Production deployments must configure an API URL.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build |
| `npm run lint` | Check the project with ESLint |

## Project structure

```text
manthanos-public/
├── app/                  # Routes, layouts, metadata, and server endpoints
├── components/           # Shared sections and interface components
├── lib/                  # API client, product copy, FAQs, and site config
├── public/               # Brand assets, illustrations, and screenshots
├── docs/                 # Supporting implementation notes
└── next.config.mjs       # Next.js and security-header configuration
```

## Key routes

| Route | Purpose |
| --- | --- |
| `/` | Product overview |
| `/features` | Platform capabilities |
| `/use-cases` | Workflows for different teams |
| `/pricing` | Plans and pricing information |
| `/blog` | Public articles and updates |
| `/request-demo` | Demo request flow |
| `/contact` | Contact and enquiry form |
| `/login` | Existing-user sign in |
| `/register` | New-user registration |

## Production deployment

Before deploying, set `NEXT_PUBLIC_API_BASE_URL` to the public backend URL, including or excluding the trailing `/api`—the client normalizes both forms.

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com/api
```

Then verify the production build locally:

```bash
npm run lint
npm run build
npm run start
```

The canonical website origin is defined in `lib/site.js`. Update it when deploying to a different permanent domain so canonical links, Open Graph metadata, and structured data remain consistent.

## Contributing

ManthanOS is currently maintained as a private product. If you are contributing as a team member, create a focused branch, keep product copy grounded in shipped functionality, and run both lint and build checks before opening a pull request.

## License

This project is private and proprietary. All rights reserved.

---

<div align="center">
  Built for teams that want the work—and the context around it—in one place.
</div>
