#!/bin/bash

# Script to create logical commit history for the Request Hub project

echo "Creating logical commit history for Request Hub..."

# Reset to before the large commit
git reset --soft HEAD~1

# 1. Project setup and configuration
echo "1. Committing project setup and configuration..."
git add package.json yarn.lock tsconfig.json next.config.ts eslint.config.mjs .prettierrc .gitignore .nvmrc .yarnrc.yml components.json postcss.config.mjs
git commit -m "chore: initialize Next.js project with TypeScript and essential dependencies

- Set up Next.js 15 with App Router
- Configure TypeScript, ESLint, and Prettier
- Add Tailwind CSS and shadcn/ui for styling
- Set up Yarn package manager with proper configuration
- Configure PostCSS and component library setup"

# 2. Database schema and configuration
echo "2. Committing database schema and configuration..."
git add prisma/ lib/database/ lib/config/ types/ init-db.sql
git commit -m "feat: set up database schema and configuration

- Configure Prisma ORM with PostgreSQL
- Define comprehensive database schema for requests, users, and organizations
- Set up environment configuration and type definitions
- Add database optimization utilities
- Include seed data for development and testing"

# 3. Authentication and authorization
echo "3. Committing authentication and authorization..."
git add lib/auth/ middleware.ts app/(public)/sign-in/ app/(public)/sign-up/ app/(public)/layout.tsx
git commit -m "feat: implement multi-tenant authentication with Clerk

- Set up Clerk authentication with organization support
- Implement middleware for route protection
- Create sign-in and sign-up pages
- Add public layout for unauthenticated users
- Configure multi-tenant user management"

# 4. Core UI components
echo "4. Committing core UI components..."
git add components/ui/ lib/ui/ app/globals.css
git commit -m "feat: create base UI component library

- Set up shadcn/ui components (button, card, dialog, etc.)
- Create custom UI components (avatar upload, search input, etc.)
- Configure global CSS with Tailwind
- Add icon library and custom icons
- Set up responsive design foundation"

# 5. Layout and navigation
echo "5. Committing layout and navigation..."
git add components/layout/ components/navbar/ app/layout.tsx app/loading.tsx app/error.tsx app/not-found.tsx
git commit -m "feat: implement application layout and navigation

- Create authenticated and public layouts
- Build responsive navbar with user controls
- Add user menu with navigation items
- Implement loading and error states
- Set up performance wrapper for optimization"

# 6. Request management components
echo "6. Committing request management components..."
git add components/requests/ lib/requests/ lib/hooks/useRequestsWithCache.ts lib/hooks/useOptimisticStatusUpdate.ts
git commit -m "feat: build request management system

- Create request cards, forms, and detail views
- Implement request filtering and virtualized lists
- Add optimistic updates for better UX
- Build request creation and editing forms
- Set up request service layer and utilities"

# 7. Admin dashboard
echo "7. Committing admin dashboard..."
git add components/admin/ lib/api/admin-dashboard.ts lib/hooks/useImpersonation.ts lib/contexts/ImpersonationContext.tsx
git commit -m "feat: implement admin dashboard with impersonation

- Create admin dashboard with statistics and activity feed
- Implement user impersonation functionality
- Add cross-tenant request management
- Build admin-specific components and utilities
- Set up admin API endpoints"

# 8. Real-time features
echo "8. Committing real-time features..."
git add lib/integrations/pusher.ts lib/providers/PusherProvider.tsx components/requests/communication/RealTimeUpdates.tsx lib/hooks/useRealTimeRequests.ts
git commit -m "feat: add real-time updates with Pusher

- Integrate Pusher for real-time communication
- Implement webhook handling for Linear updates
- Add real-time request status updates
- Create connection status indicators
- Set up real-time chat functionality"

# 9. External integrations
echo "9. Committing external integrations..."
git add lib/integrations/linear.ts app/api/webhooks/linear/route.ts
git commit -m "feat: integrate Linear for task management

- Set up Linear API integration
- Implement webhook handling for status updates
- Create automatic task creation on request submission
- Add Linear task synchronization
- Configure webhook security and validation"

# 10. API routes
echo "10. Committing API routes..."
git add app/api/requests/ app/api/users/ app/api/admin/ app/api/auth/ app/api/health/ app/api/onboard/ app/api/setup/
git commit -m "feat: implement comprehensive API routes

- Create request CRUD operations
- Add user management endpoints
- Implement admin API routes
- Set up authentication context endpoints
- Add health check and setup endpoints"

# 11. Page components
echo "11. Committing page components..."
git add app/(protected)/ app/page.tsx
git commit -m "feat: create application pages and routing

- Implement protected route pages (requests, admin, profile, etc.)
- Create landing page with sections
- Add loading and error pages
- Set up route groups for organization
- Implement page-level components"

# 12. Testing setup
echo "12. Committing testing setup..."
git add tests/ playwright.config.ts
git commit -m "feat: add comprehensive testing setup

- Configure Playwright for E2E testing
- Create authentication test helpers
- Add page object models
- Set up test fixtures and utilities
- Implement login flow tests"

# 13. Deployment and DevOps
echo "13. Committing deployment and DevOps..."
git add Dockerfile Dockerfile.dev docker-compose.yml docker-compose.prod.yml nginx.conf .github/workflows/ci-cd.yml vercel.json scripts/
git commit -m "feat: add deployment and DevOps configuration

- Create multi-stage Dockerfiles for dev and production
- Set up docker-compose for local development
- Configure CI/CD pipeline with GitHub Actions
- Add Vercel deployment configuration
- Create utility scripts for development"

# 14. Documentation
echo "14. Committing documentation..."
git add documentation/ README.md
git commit -m "docs: add comprehensive documentation

- Create detailed README with setup instructions
- Add architecture and performance documentation
- Include Docker optimization guides
- Document API endpoints and usage
- Add development and deployment guides"

# 15. Final polish and assets
echo "15. Committing final polish and assets..."
git add public/ cspell.json
git commit -m "feat: add assets and final polish

- Add public assets (icons, images, logos)
- Configure spell checking
- Add favicon and app icons
- Include static assets for UI components
- Final project cleanup and organization"

echo "✅ Successfully created logical commit history!"
echo "📝 Total commits created: 15"
echo "🚀 Your project now has a clean, professional commit history!" 