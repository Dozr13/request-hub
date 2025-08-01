# Request Hub - Full-Stack SaaS Platform

A production-ready multi-tenant Request Hub built with modern web technologies. This project demonstrates advanced full-stack development skills including real-time features, third-party integrations, and scalable architecture.

## 🚀 Live Demo

[Deployed on Vercel](https://request-hub-gamma.vercel.app/)

## ✨ Features

### Core Functionality

- **Multi-tenant Authentication** - Secure user management with Clerk
- **Request Management** - Create, track, and manage requests with real-time updates
- **Linear Integration** - Automatic task creation and status synchronization
- **Real-time Updates** - Live status updates via Pusher webhooks
- **Admin Dashboard** - Cross-tenant management with user impersonation
- **Responsive Design** - Mobile-first UI built with Tailwind CSS and shadcn/ui

### Technical Highlights

- **Next.js 15** with App Router for optimal performance
- **TypeScript** for type safety and developer experience
- **PostgreSQL** with Prisma ORM for robust data management
- **Real-time Communication** via Pusher for live updates
- **E2E Testing** with Playwright for reliable functionality
- **Docker Support** for consistent development and deployment
- **Performance Optimizations** including virtual scrolling and optimistic updates

## 🛠 Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** Clerk (with organization support)
- **Real-time:** Pusher
- **External APIs:** Linear
- **Testing:** Playwright
- **Deployment:** Vercel
- **Containerization:** Docker

## 🏗 Architecture

This project demonstrates several architectural patterns:

- **Multi-tenant SaaS Architecture** with strict tenant isolation
- **Real-time WebSocket Integration** for live updates
- **External API Integration** with webhook handling
- **Role-based Access Control** with admin impersonation
- **Optimistic UI Updates** for better user experience
- **Error Boundaries** and comprehensive error handling

## 🚀 Getting Started

### Prerequisites

- Node.js 22.x
- PostgreSQL
- Docker (optional)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Dozr13/request-hub.git
   cd request-hub
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `CLERK_SECRET_KEY` - Clerk authentication secret
   - `CLERK_PUBLISHABLE_KEY` - Clerk public key
   - `LINEAR_API_KEY` - Linear API key
   - `PUSHER_APP_ID` - Pusher app ID
   - `PUSHER_KEY` - Pusher key
   - `PUSHER_SECRET` - Pusher secret

4. **Set up the database**

   ```bash
   yarn db:generate
   yarn db:migrate
   yarn db:seed
   ```

5. **Start the development server**
   ```bash
   yarn dev
   ```

### Docker Setup

For containerized development:

```bash
yarn docker:build-dev
yarn docker:run-dev
```

## 🧪 Testing

Run the test suite:

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test with UI
yarn test:ui
```

## 📦 Deployment

### Vercel (Recommended)

```bash
yarn deploy:prod
```

### Docker Production

```bash
yarn docker:build-prod
yarn docker:run-prod
```

## 🏛 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (protected)/       # Authenticated routes
│   ├── (public)/          # Public routes
│   └── api/               # API routes
├── components/            # Reusable React components
│   ├── admin/            # Admin-specific components
│   ├── requests/         # Request management components
│   ├── ui/               # Base UI components
│   └── layout/           # Layout components
├── lib/                  # Utility libraries
│   ├── api/              # API client functions
│   ├── auth/             # Authentication utilities
│   ├── database/         # Database configuration
│   └── utils/            # General utilities
├── prisma/               # Database schema and migrations
├── types/                # TypeScript type definitions
└── tests/                # Test files
```

## 🎯 Key Development Decisions

### Multi-tenancy Implementation

- Used Clerk's organization feature for tenant isolation
- Implemented strict data scoping at the database level
- Added admin impersonation for cross-tenant management

### Real-time Architecture

- Chose Pusher for reliable real-time communication
- Implemented webhook handling for Linear status updates
- Added optimistic updates for better UX

### Performance Optimizations

- Virtual scrolling for large request lists
- Optimistic UI updates for immediate feedback
- Efficient caching strategies with React Query
- Bundle optimization with Next.js

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About the Developer

This project was built as a demonstration of full-stack development capabilities, showcasing:

- Modern React/Next.js development
- Real-time application architecture
- Third-party API integration
- Production-ready deployment practices
- Comprehensive testing strategies

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
