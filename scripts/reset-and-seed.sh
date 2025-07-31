#!/bin/bash

# Reset and Seed Database Script
# This script will reset the database and run the seed for both local and production

set -e

echo "Starting database reset and seed process..."

# Function to reset and seed database
reset_and_seed() {
    local env_name=$1
    local database_url=$2

    echo "Processing $env_name environment..."
    echo "Database URL: $database_url"

    # Set the DATABASE_URL environment variable
    export DATABASE_URL="$database_url"

    echo "Resetting database schema..."
    npx prisma db push --force-reset

    echo "Running seed script..."
    npx tsx prisma/seed.ts

    echo "$env_name environment completed successfully!"
    echo ""
}

# Check if we're running locally or for production
if [ "$1" = "production" ]; then
    echo "Setting up PRODUCTION database..."

    # Load production environment variables from .env.production
    if [ ! -f ".env.production" ]; then
        echo "Error: .env.production file not found"
        echo "Please create a .env.production file with your VERCEL_DATABASE_URL"
        exit 1
    fi

    source .env.production

    if [ -z "$VERCEL_DATABASE_URL" ]; then
        echo "Error: VERCEL_DATABASE_URL not found in .env.production file"
        echo "Please add VERCEL_DATABASE_URL to your .env.production file"
        exit 1
    fi

    reset_and_seed "PRODUCTION" "$VERCEL_DATABASE_URL"

elif [ "$1" = "local" ]; then
    echo "Setting up LOCAL database..."

    # Check if .env file exists
    if [ ! -f ".env" ]; then
        echo "Error: .env file not found"
        echo "Please create a .env file with your DATABASE_URL"
        exit 1
    fi

    # Load environment variables from .env
    source .env

    if [ -z "$DATABASE_URL" ]; then
        echo "Error: DATABASE_URL not found in .env file"
        echo "Please add DATABASE_URL to your .env file"
        exit 1
    fi

    reset_and_seed "LOCAL" "$DATABASE_URL"

else
    echo "Error: Please specify 'local' or 'production'"
    echo ""
    echo "Usage:"
    echo "  ./scripts/reset-and-seed.sh local      # Reset and seed local database"
    echo "  ./scripts/reset-and-seed.sh production # Reset and seed production database"
    echo ""
    echo "For production, make sure to set VERCEL_DATABASE_URL environment variable:"
    echo "  export VERCEL_DATABASE_URL='your-vercel-postgres-url'"
    exit 1
fi

echo "Database reset and seed completed successfully!"
echo ""
echo "Next steps:"
echo "1. Set up Clerk organizations with the following IDs:"
echo "   - org_30PWBDe4wjMYWRsf7l0QcGhjKLQ (TechCorp)"
echo "   - org_30PWEbUNmjCn9L5QsTl0NdjsJGB (FinTech)"
echo "   - org_30PWICTi4Lu915bIrd0Ww2nxI7U (HTV Admin)"
echo "   - org_30P9yxXysREHXm7vf5XhoGQ0K6u (E2E Test)"
echo ""
echo "2. Update the getClerkOrganization function in lib/clerk-org.ts"
echo "   to use real Clerk API calls instead of mock data"
echo ""
echo "3. Test the application with the seeded data"
