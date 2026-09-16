# IRES Dashboard

A modern dashboard for incident response and emergency services management.

## Project Structure

```tree
dashboard-frontend/
├── public/                # Static assets
│   ├── favicon.ico       # Site favicon
│   └── index.html        # HTML template
│
├── src/
│   ├── features/         # Feature-based modules
│   │   ├── auth/        # Authentication feature
│   │   │   ├── components/    # Auth-specific components
│   │   │   ├── hooks/        # Auth-related hooks
│   │   │   └── store/        # Auth state management
│   │   │
│   │   ├── agents/      # Agents management feature
│   │   │   ├── components/    # Agent-specific components
│   │   │   ├── hooks/        # Agent-related hooks
│   │   │   └── store/        # Agent state management
│   │   │
│   │   ├── incidents/   # Incidents management feature
│   │   │   ├── components/    # Incident-specific components
│   │   │   ├── hooks/        # Incident-related hooks
│   │   │   └── store/        # Incident state management
│   │   │
│   │   └── responders/  # Responders management feature
│   │       ├── components/    # Responder-specific components
│   │       ├── hooks/        # Responder-related hooks
│   │       └── store/        # Responder state management
│   │
│   ├── shared/          # Shared resources
│   │   ├── assets/      # Static assets
│   │   │   ├── images/  # Image files
│   │   │   ├── icons/   # SVG icons
│   │   │   └── fonts/   # Custom fonts
│   │   │
│   │   ├── components/  # Reusable UI components
│   │   │   ├── ui/      # Basic UI components (Button, Input, etc.)
│   │   │   └── layout/  # Layout components (Header, Footer, etc.)
│   │   │
│   │   ├── constants/   # Static constants
│   │   │   ├── routes.ts    # Route definitions
│   │   │   └── config.ts    # App configuration
│   │   │
│   │   ├── hooks/      # Shared hooks
│   │   │   └── useLocalStorage.ts # Local storage hook
│   │   │
│   │   ├── lib/        # Utility functions
│   │   │   ├── api.ts  # API client setup
│   │   │   └── utils.ts # Helper functions
│   │   │
│   │   ├── services/   # API services
│   │   │   ├── auth.ts      # Authentication service
│   │   │   ├── incidents.ts # Incident management
│   │   │   └── responders.ts # Responder management
│   │   │
│   │   ├── styles/     # Global styles
│   │   │   └── globals.css  # Global CSS and Tailwind config
│   │   │
│   │   ├── types/      # TypeScript types
│   │   │   ├── index.ts     # Common types
│   │   │   └── api.ts       # API response types
│   │   │
│   │   ├── App.tsx     # Root component
│   │   └── main.tsx    # Entry point
│   │
├── .env                 # Environment variables
├── .gitignore          # Git ignore rules
├── index.html          # HTML entry point
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```tree
   VITE_API_URL=http://localhost:3000/api
   VITE_AUTH_TOKEN_KEY=auth_token
   VITE_ENABLE_ANALYTICS=true
   VITE_ENABLE_NOTIFICATIONS=true
   VITE_MAP_API_KEY=your_map_api_key_here
   VITE_APP_NAME=IRES Dashboard
   VITE_APP_VERSION=1.0.0
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Features

- Authentication and Authorization
- Incident Management
- Responder Tracking
- Real-time Analytics
- Interactive Maps
- User Management
- Settings and Configuration

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- Zustand (State Management)

## Contributing

1. Fork the repository
2. Create your feature branch from `dev`:

   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and build the project:

   ```bash
   npm install
   npm run build
   ```

4. Commit your changes following conventional commits:

   ```bash
   # Format: type(scope): description
   # Examples:
   git commit -m "feat(auth): add password reset functionality"
   git commit -m "fix(ui): resolve button alignment issue"
   git commit -m "chore(validation): added validation for "
   git commit -m "docs(readme): update setup instructions"
   ```

5. Push to your feature branch:

   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request:
   - Title format: `type(scope): concise description`
   - Description: Include what, why, and how
   - Always request review from at least one team member
   - Link related issues if applicable

### Branch Naming Convention

- Feature: `feature/descriptive-name`
- Bugfix: `fix/issue-description`
- Documentation: `docs/topic`
- Refactor: `refactor/component-name`

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

## License

This project is licensed under the MIT License.
