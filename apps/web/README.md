# Web Application

The main Next.js web application for the monorepo template.

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm 10.x or higher

### Development

From the root of the monorepo, run:

```bash
pnpm dev
```

This starts the development server at `http://localhost:3000` with Turbopack for fast refresh.

### Building

```bash
pnpm build
```

Builds the Next.js application for production.

### Production

```bash
pnpm start
```

Starts the production server.

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
```

## Technologies

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## Linting

```bash
# Run ESLint
pnpm lint

# Fix linting issues
pnpm lint --fix
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
