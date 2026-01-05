# Reward Back - Credit Card Manager

A modern credit card management web app built with [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and deployed on [GitHub Pages](https://pages.github.com/). Browse, filter, and track your reward credit cards with real-time quota calculations.

## Features

- 🎴 **Credit Card Display** - Browse all your reward credit cards from JSON data
- 🔍 **Text Filter** - Search cards by name or bank issuer in real-time
- 📊 **Quota Calculator** - Calculate remaining credit quota with mathematical expressions (e.g., `1000-50-30`)
- 💾 **Local Storage** - Persist quota calculations across sessions
- 🌙 **Dark Theme** - Beautiful dark mode interface with Tailwind CSS
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- 🚀 **GitHub Pages Ready** - Automated deployment with GitHub Actions
- 📈 **Component Architecture** - Clean, reusable component structure with server/client separation

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

### Installation & Development

```bash
# Install dependencies
pnpm install

# Start development server (with Turbopack)
pnpm --filter=web dev

# Navigate to http://localhost:3000
```

### Building & Deployment

```bash
# Build for production
pnpm --filter=web build

# Lint code
pnpm --filter=web lint

# Format code
pnpm format
```

## Live Demo

The web app is deployed on GitHub Pages and accessible at:
👉 [https://wuleoeluw.github.io/reward-back](https://wuleoeluw.github.io/reward-back)

## Card Data Structure

Credit cards are defined in JSON files under `apps/web/public/_frontmatter/`:

```json
{
  "title": "現金回饋Green卡",
  "image": "https://bank.sinopac.com/upload/sinopac/picture/197bef0f510000003aea.png",
  "issuer": "永豐銀行",
  "dueDate": "2026/6/30",
  "upperLimit": 7500,
  "rate": 5,
  "href": "https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/cashcard.html"
}
```

### Adding New Cards

1. Create a new directory under `apps/web/public/_frontmatter/{cardId}/`
2. Add a `frontmatter.json` file with the card details above
3. The build script will automatically generate and include it

## How It Works

### Data Flow

1. **Build Time**: `prebuild` script generates JSON files from frontmatter data
2. **Runtime**: App fetches `cards-manifest.json` and loads individual card JSONs
3. **Client-Side**: React manages filtering, search, and quota calculations
4. **Storage**: Quota data persists in browser localStorage

## Project Structure

```
.
├── apps/
│   └── web/                           # Next.js credit card app
│       ├── public/
│       │   ├── _frontmatter/          # Card data source
│       │   │   └── {cardId}/
│       │   │       └── frontmatter.json
│       │   ├── cards/                 # Generated card JSON files
│       │   └── cards-manifest.json    # Generated manifest
│       ├── src/
│       │   ├── app/                   # Next.js app directory
│       │   │   ├── page.tsx           # Main page (client component)
│       │   │   ├── layout.tsx         # Root layout
│       │   │   └── globals.css        # Global styles
│       │   ├── components/            # Reusable components
│       │   │   ├── CardItem.tsx       # Individual card component
│       │   │   ├── CardGrid.tsx       # Cards grid layout
│       │   │   ├── SearchBar.tsx      # Search input
│       │   │   ├── PageHeader.tsx     # Page header
│       │   │   ├── LoadingSpinner.tsx # Loading state
│       │   │   └── EmptyState.tsx     # No results state
│       │   └── utilities/             # Helper functions
│       │       ├── quotaCalculator.ts # Quota calculation logic
│       │       └── cardLoader.ts      # Card data loading
│       ├── scripts/
│       │   └── generate-cards.ts      # Build script for JSON generation
│       ├── next.config.ts             # Next.js configuration
│       └── package.json
├── .github/
│   └── workflows/
│       └── deploy.yml                 # GitHub Actions CI/CD pipeline
└── package.json
```

## Features in Detail

### Quota Calculator

Users can enter cost expressions using standard math operators:

- Single numbers: `500`
- Addition: `100+50+75`
- Complex expressions: `1000-100*2/3`

Formula: `Remaining Quota = Upper Limit - Cost`

### Dark Theme

- Slate-900 to slate-800 gradient background
- Slate-800 card panels with proper contrast
- Blue accent colors for interactive elements
- Smooth transitions and hover effects

### Mobile Responsive

- 1-column layout on phones
- 2-column layout on tablets
- 3-column layout on desktop
- Touch-friendly buttons and inputs

## Technology Stack

| Tool           | Purpose                     |
| -------------- | --------------------------- |
| Next.js 16     | React framework with SSR    |
| React 19       | UI library                  |
| TypeScript     | Type safety                 |
| Tailwind CSS 4 | Styling & responsive design |
| pnpm           | Package manager             |
| GitHub Actions | CI/CD pipeline              |
| GitHub Pages   | Static hosting              |
| ESLint         | Code linting                |
| Prettier       | Code formatting             |

## Deployment

### Automated Deployment

The app automatically deploys to GitHub Pages on every push to `main` branch via GitHub Actions:

1. **Build Stage**: Generates static files with Next.js
2. **Pre-build Script**: Converts frontmatter JSON to public card files
3. **Deploy Stage**: Uploads artifacts to GitHub Pages

### Manual Deployment

```bash
# Build locally
pnpm --filter=web build

# Output is in apps/web/out/
# Upload to your hosting service
```

### GitHub Pages Configuration

To enable deployment:

1. Go to repository settings → Pages
2. Select "GitHub Actions" as build source
3. The workflow will deploy automatically

## Contributing

1. Create a feature branch: `git checkout -b feat/feature-name`
2. Make changes and commit: `git commit -m "feat: description"`
3. Push to branch: `git push origin feat/feature-name`
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
