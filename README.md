# ♞ Vitez

Vitez is a full-stack Next.js application for learning and practising chess-knight
movement through interactive simulations, challenges, and leaderboards.

![Animation GIF](readme_animation.gif)

## Highlights

- Interactive knight movement simulation
- Shortest-path visualisation on a chessboard
- User registration, credential authentication, and account management
- Challenge modes with score tracking and leaderboards
- Daily challenges and administrator tools
- Responsive UI with custom chess-themed visual design

## Tech Stack

- Next.js 14 and React 18
- Next.js Server Actions and Auth.js credentials authentication
- PostgreSQL (local PostgreSQL in development, Vercel Postgres/Neon in deployment)
- Tailwind CSS and Heroicons
- Zod, bcryptjs, Luxon, and react-timer-hook

## Project Structure

```text
vitez/
├── app/
│   ├── lib/              # Database access, queries, and server actions
│   ├── ui/               # Reusable UI components
│   └── layout.jsx
├── public/               # Static assets and illustrations
├── scripts/
│   ├── seed.js           # Database schema and generic demo data
│   └── changePassword.js # Password management utility
├── auth.js               # Auth.js configuration
├── auth.config.js        # Authentication and route configuration
├── middleware.js         # Route protection
├── next.config.mjs
├── package.json
├── tailwind.config.js
└── postcss.config.mjs
```

## Local development

### Prerequisites

- Node.js 22 or newer
- PostgreSQL 14 or newer

### Setup

```bash
git clone https://github.com/vljn/vitez.git
cd vitez
npm install
```

Create a database named `vitez`, copy `.env.example` to `.env`, and update the
PostgreSQL username and password:

```env
POSTGRES_URL=postgres://postgres:password@localhost:5432/vitez
AUTH_SECRET=your-local-secret
```

Create the tables and generic demo data:

```bash
npm run seed
```

Start the development server:

```bash
npm run dev
```

The app is available at [localhost:3000](http://localhost:3000).

The seed creates these local demo accounts:

| Role | Username | Password |
| --- | --- | --- |
| Administrator | `adminUser` | `Admin1234` |
| User | `demoUser` | `Demo1234` |

Change or remove these accounts before using a shared or public environment.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run seed` | Create/update the schema and insert demo data |
| `npm run change-password -- <username> <password>` | Change a user's password |

## Deployment

The application is deployed using Vercel. Configure `POSTGRES_URL` with the
Vercel Postgres/Neon connection string and set a strong `AUTH_SECRET` in the
Vercel project environment variables. Do not commit `.env` or production
credentials.

**Live application:** [vitez-weld.vercel.app](https://vitez-weld.vercel.app/)
