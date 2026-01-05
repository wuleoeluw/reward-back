# Monorepo Template

A modern, scalable monorepo template built with [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Turborepo](https://turbo.build/). This template provides a solid foundation for building multiple applications and shared packages with a unified development experience.

## Features

- 🚀 **Next.js 16** - Latest React framework with App Router and Turbopack
- ⚛️ **React 19** - Modern React with the latest features and optimizations
- 📦 **pnpm** - Fast, disk space efficient package manager
- 🏗️ **Turborepo** - High-performance build system for monorepos
- 🎨 **Tailwind CSS 4** - Utility-first CSS framework
- ✨ **TypeScript** - Full type safety across the monorepo
- 🔧 **ESLint & Prettier** - Consistent code quality and formatting
- 🧪 **Vitest** - Unit testing framework
- 🐕 **Husky & lint-staged** - Git hooks for code quality

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- pnpm 10.x or higher

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build all packages
pnpm build

# Run linting with auto-fix
pnpm lint

# Format code with Prettier
pnpm format

# Run tests
pnpm test

# Clean build artifacts
pnpm clean
```

## Project Structure

```
.
├── apps/                      # Applications
│   └── web/                   # Next.js web application
├── packages/                  # Shared packages
│   ├── config-eslint/         # Shared ESLint configuration
│   ├── config-prettier/       # Shared Prettier configuration
│   └── config-tsconfig/       # Shared TypeScript configuration
├── turbo.json                 # Turborepo configuration
├── pnpm-workspace.yaml        # pnpm workspace configuration
└── package.json               # Root package configuration
```

## Development

### Adding a New App

1. Create a new directory under `apps/`
2. Initialize with `package.json` and appropriate configuration files
3. Reference shared configs from `packages/`

### Adding a Shared Package

1. Create a new directory under `packages/`
2. Create `package.json` with scoped name (e.g., `@monorepo/package-name`)
3. Add dependencies in root `package.json` using workspace protocol

### Workspace Dependencies

Packages can reference each other using the `workspace:*` protocol in `package.json`:

```json
{
  "dependencies": {
    "@monorepo/config-eslint": "workspace:*"
  }
}
```

## Scripts

- `pnpm dev` - Start development servers (using Turbopack)
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run tests with Vitest
- `pnpm clean` - Clean all build artifacts

## Technology Stack

| Tool           | Purpose             |
| -------------- | ------------------- |
| Next.js 16     | React framework     |
| React 19       | UI library          |
| TypeScript     | Type safety         |
| Tailwind CSS 4 | Styling             |
| pnpm           | Package manager     |
| Turborepo      | Build orchestration |
| ESLint         | Code linting        |
| Prettier       | Code formatting     |
| Vitest         | Unit testing        |

## License

This project is licensed under the MIT License - see the LICENSE file for details.
