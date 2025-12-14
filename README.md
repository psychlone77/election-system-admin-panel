# Election System Admin Panel

This is the admin panel for the election system. It is part of the [Election System Core](https://github.com/psychlone77/election-system-core) repository.

## Related Repositories

- [Election System Core](https://github.com/psychlone77/election-system-core) - Backend servers and cryptographic libraries
- [Election System Mobile App](https://github.com/psychlone77/election-system-mobile-app) - Mobile voting application

## UI Screenshots

### Admin Tallying Complete Screen
<img width="940" height="485" alt="image" src="https://github.com/user-attachments/assets/bacf1dc5-45fc-43ab-ba05-865f7c75bcc3" />


### Public Ballot Display
<img width="940" height="561" alt="image" src="https://github.com/user-attachments/assets/b4768b6a-0a8a-418f-b251-0e49d5c62c5d" />


---

## Overview

The Election System Admin Panel is a modern web application built with React and TypeScript, providing administrative interfaces for managing voters, candidates, and election tallying. It integrates with the Election System Core backend servers to provide a complete election management solution.

## Technology Stack

### Core Framework
- **React 19** - Latest version with React Compiler enabled for automatic optimization
- **TypeScript** - Type-safe development
- **Vite 7** - Lightning-fast build tool and dev server

### Key Libraries

- **Auth0 React SDK** (`@auth0/auth0-react`) - Enterprise-grade authentication and authorization
- **React Router v7** - Client-side routing and navigation
- **Axios** - HTTP client for API communication with backend servers
- **Lucide React** - Beautiful, consistent icon library
- **TailwindCSS** - Utility-first CSS framework for rapid UI development

### Development Tools

- **React Compiler** (`babel-plugin-react-compiler`) - Automatic optimization of React components
- **ESLint** - Code quality and consistency
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS & Autoprefixer** - CSS processing and browser compatibility

## Features

The admin panel provides interfaces for:

- **Voter Management** - Register and manage voter information
- **Candidate Management** - Register and manage election candidates
- **Ballot Management** - View and manage submitted ballots
- **Tallying** - Initiate and view election results using threshold cryptography
- **Public Results Display** - Public-facing results visualization
- **Authentication** - Secure admin access via Auth0

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

```bash
npm install
```

### Running the Development Server

Start the Vite development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port). The `--host` flag allows access from other devices on your network.

### Building for Production

Compile TypeScript and build optimized production bundle:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
election-system-admin-panel/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── loginbutton.tsx
│   │   ├── logoutbutton.tsx
│   │   └── RequireAuth.tsx
│   ├── layouts/          # Layout components
│   │   └── adminlayouts.tsx
│   ├── pages/            # Page components
│   │   ├── candidates/   # Candidate management pages
│   │   ├── voters/       # Voter management pages
│   │   ├── dashboard.tsx
│   │   ├── tally.tsx
│   │   ├── publictally.tsx
│   │   └── ...
│   ├── routes/           # Route configuration
│   │   └── index.tsx
│   ├── services/         # API service layer
│   │   ├── authServices.tsx
│   │   ├── ballotServices.tsx
│   │   └── candidateServices.tsx
│   ├── App.tsx           # Root component
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── index.html            # HTML template
└── vite.config.ts        # Vite configuration
```

## Configuration

### Vite Configuration

The project uses Vite with React plugin and React Compiler enabled for automatic performance optimization:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
```

### TailwindCSS

TailwindCSS is configured to scan all TypeScript/JavaScript files in the `src` directory for class names.

## Interesting Features

### React Compiler
This project uses the experimental React Compiler (formerly known as React Forget), which automatically optimizes React components by memoizing expensive computations and preventing unnecessary re-renders. This provides performance benefits similar to manually using `useMemo` and `useCallback`, but done automatically by the compiler.

### Auth0 Integration
Enterprise-grade authentication is implemented using Auth0, providing:
- Secure OAuth 2.0 / OpenID Connect authentication
- Multi-factor authentication support
- Social login integration capabilities
- Centralized user management

### Modern React Patterns
The codebase uses React 19 features and modern patterns, including:
- Functional components with Hooks
- TypeScript for type safety
- Protected routes with authentication checks
- Service layer abstraction for API calls

## Development Notes

- The dev server runs with `--host` flag to allow network access
- React Compiler is enabled, which may impact build performance but improves runtime performance
- TailwindCSS provides rapid UI development with utility classes
- ESLint is configured with React-specific rules for code quality
