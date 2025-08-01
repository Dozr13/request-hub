#!/bin/bash

# Request Hub - Docker Setup Script
# This script ensures your Docker environment is properly configured

set -e  # Exit on any error

echo " Request Hub - Docker Setup"
echo "=================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "  Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

echo " Docker is running"

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo ".env.local not found!"
    echo "Copying env.example.local to .env.local..."

    if [ -f env.example.local ]; then
        cp env.example.local .env.local
        echo " Created .env.local from env.example.local"
        echo "Please edit .env.local with your actual values before continuing"
        echo "   - Update Clerk keys if needed"
        echo "   - Update Pusher keys if needed"
        echo "   - Update Linear API keys if needed"
        echo ""
        read -p "Press Enter when you've updated .env.local..."
    else
        echo "  env.example.local not found. Please create .env.local manually."
        exit 1
    fi
fi

echo " .env.local exists"

# Clean up any existing containers
echo "Cleaning up existing containers..."
docker compose down -v --remove-orphans

# Build the development image
echo " Building development Docker image..."
docker build -f Dockerfile.dev -t request-hub-dev .

# Start database and Redis services
echo " Starting database and Redis..."
docker compose up -d postgres redis

# Wait for services to be healthy
echo "Waiting for services to be healthy..."
timeout=60
counter=0

while [ $counter -lt $timeout ]; do
    if docker compose ps --filter "health=healthy" | grep -q "postgres"; then
        if docker compose ps --filter "health=healthy" | grep -q "redis"; then
            echo " All services are healthy"
            break
        fi
    fi

    counter=$((counter + 1))
    sleep 1

    if [ $counter -eq $timeout ]; then
        echo "  Services did not become healthy within ${timeout} seconds"
        docker compose logs
        exit 1
    fi
done

# Install dependencies and generate Prisma client
echo "Installing dependencies..."
yarn install

# Generate Prisma client
echo "Generating Prisma client..."
yarn db:generate

# Push database schema
echo "Pushing database schema..."
yarn db:push

# Optional: Seed database
read -p "Would you like to seed the database with sample data? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Seeding database..."
    if command -v yarn db:seed >/dev/null 2>&1; then
        yarn db:seed
    else
        echo " No seed script found. Skipping..."
    fi
fi

# Test database connection
echo "Testing database connection..."
if DATABASE_URL="postgresql://postgres:postgres@localhost:5432/request_hub_db" yarn db:generate > /dev/null 2>&1; then
    echo " Database connection successful"
else
    echo "  Database connection failed"
    exit 1
fi

# Start all services
echo " Starting all services..."
docker compose up -d

# Wait for app to be ready
echo "Waiting for application to be ready..."
timeout=120
counter=0

while [ $counter -lt $timeout ]; do
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        echo " Application is ready!"
        break
    fi

    counter=$((counter + 1))
    sleep 1

    if [ $counter -eq $timeout ]; then
        echo "  Application did not start within ${timeout} seconds"
        echo "Check logs with: docker compose logs app"
        exit 1
    fi
done

echo ""
echo "Docker setup complete!"
echo "=================================="
echo "Application: http://localhost:3000"
echo " PostgreSQL: localhost:5432"
echo "Redis: localhost:6379"
echo "pgAdmin: http://localhost:5050 (run 'yarn docker:tools' to start)"
echo ""
echo "Useful commands:"
echo "   yarn docker:logs    - View logs"
echo "   yarn docker:down    - Stop all services"
echo "   yarn docker:restart - Restart services"
echo "   yarn docker:clean   - Clean up everything"
echo ""
echo "Health check: curl http://localhost:3000/api/health"
