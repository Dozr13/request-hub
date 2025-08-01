#!/bin/bash

# Request Hub PostgreSQL Reset Script
# This script safely resets PostgreSQL containers and volumes

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${YELLOW}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_status "Stopping PostgreSQL container..."
docker compose stop postgres || true

print_status "Removing PostgreSQL container..."
docker compose rm -f postgres || true

print_status "Removing PostgreSQL volume..."
docker volume rm dev-test-new_postgres_data || true

print_status "Creating fresh PostgreSQL volume..."
docker volume create dev-test-new_postgres_data

print_status "Setting proper permissions on volume..."
docker run --rm -v dev-test-new_postgres_data:/data alpine chown -R 999:999 /data

print_success "PostgreSQL reset completed!"
print_status "You can now run: yarn docker:run-dev --setup"
