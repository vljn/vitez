# ♞ Vitez

Vitez is a full-stack web application for simulating and exploring knight movement on a chessboard.

The application combines an interactive chessboard with user authentication, score tracking, leaderboards, daily challenges, and custom challenges.

![Animation GIF](readme_animation.gif)

## Features

- Interactive knight movement simulation
- Chessboard-based gameplay
- User registration and authentication
- User profiles and account management
- Score tracking and leaderboards
- Daily challenges
- Custom challenges
- Administrator functionality
- Responsive user interface

## Tech Stack

### Frontend

- Next.js 14
- React 18
- Tailwind CSS
- Heroicons

### Backend

- Next.js Server Actions
- Auth.js
- PostgreSQL
- Vercel Postgres
- bcryptjs
- Zod

### Other

- Luxon
- react-timer-hook
- ESLint

## Project Structure

```text
vitez/
├── app/
│   ├── lib/              # Database queries and server actions
│   ├── ...               # Pages and UI components
│   └── layout.jsx
├── public/               # Static assets
├── scripts/
│   ├── seed.js           # Database initialization and seed data
│   └── changePassword.js # Password management utility
├── auth.js               # Auth.js configuration
├── auth.config.js        # Authentication and route configuration
├── middleware.js         # Route protection
├── next.config.mjs
├── package.json
├── tailwind.config.js
└── postcss.config.mjs
```

## Deployment

The application is deployed using Vercel.

**Live application:** [vitez-weld.vercel.app](https://vitez-weld.vercel.app/)
