# Supportly

Supportly is an early-stage customer support application. The project currently focuses on its public-facing experience: a welcome page and account login and sign-up forms, with responsive styling and light/dark themes.

> **Project status:** The interface and client-side form validation are in place. Authentication, account persistence, and backend services have not been connected yet; submitting a valid form currently logs its values to the browser console.

## Features so far

- Welcome page with links to log in or create an account
- Login form with email and password validation
- Sign-up form with personal and company account options
- Company-specific fields, including company name and employee count
- Date-of-birth selection and an age-18 validation rule
- Light and dark themes, with the initial theme following the system preference
- Shared UI components built with Radix UI and styled with Tailwind CSS

## Tech stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 18 and [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [shadcn/ui](https://ui.shadcn.com/) components and [Radix UI](https://www.radix-ui.com/)
- [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/) for form handling and validation
- [next-themes](https://github.com/pacocoursey/next-themes) for theme switching

## Getting started

### Prerequisites

- Node.js (a version compatible with the installed Next.js release)
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```text
app/
  (logged-out)/
    login/       Login page
    sign-up/     Sign-up page
    page.tsx     Public welcome page
  globals.css    Global styles and theme tokens
components/
  theme-provider.tsx
  ui/            Shared interface components
lib/
  utils.ts       Shared utilities
public/          Static assets
```

## Current limitations

- Login and sign-up are UI prototypes; there is no authentication provider or API integration yet.
- Form submissions are not persisted and do not create or sign in to an account.
- The app does not yet include authenticated support workflows or a database.

## Contributing

This project is under active development. To work on it locally, create a branch, make your changes, and run `npm run lint` and `npm run build` before opening a pull request.
