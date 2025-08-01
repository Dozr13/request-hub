#!/bin/bash

# Request Hub - Docker Optimization Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="request-hub-app"
TAG="latest"
PROD_TAG="production"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
    print_success "Docker is running"
}

# Function to clean up Docker resources
cleanup() {
    print_status "Cleaning up Docker resources..."

    # Remove dangling images
    docker image prune -f

    # Remove unused containers
    docker container prune -f

    # Remove unused networks
    docker network prune -f

    # Remove unused volumes (be careful with this in production)
    if [ "$1" = "--aggressive" ]; then
        docker volume prune -f
    fi

    print_success "Cleanup completed"
}

# Function to build optimized development image
build_dev() {
    print_status "Building development Docker image..."

    docker build \
        --cache-from ${IMAGE_NAME}:cache \
        --tag ${IMAGE_NAME}:${TAG} \
        --file Dockerfile.dev \
        .

    print_success "Development image built successfully"
}

# Function to build optimized production image
build_prod() {
    print_status "Building production Docker image..."

    # Build with BuildKit for better caching
    DOCKER_BUILDKIT=1 docker build \
        --target runner \
        --cache-from ${IMAGE_NAME}:${PROD_TAG} \
        --tag ${IMAGE_NAME}:${PROD_TAG} \
        --file Dockerfile \
        .

    print_success "Production image built successfully"
}

# Function to run development environment
run_dev() {
    print_status "Starting development environment..."

    # Stop existing containers
    docker compose down

    # Start with setup profile if requested
    if [ "$1" = "--setup" ]; then
        print_status "Running database setup..."
        docker compose --profile setup up migrate seed
    fi

    # Start development environment
    docker compose up -d

    print_success "Development environment started"
    print_status "Application available at: http://localhost:3000"
    print_status "pgAdmin available at: http://localhost:5050 (if enabled)"
    print_status "Redis Commander available at: http://localhost:8081 (if enabled)"
}

# Function to run production environment
run_prod() {
    print_status "Starting production environment..."

    # Check if .env.production exists
    if [ ! -f .env.production ]; then
        print_error ".env.production file not found. Please create it with production environment variables."
        exit 1
    fi

    # Load production environment variables
    export $(cat .env.production | grep -v '^#' | xargs)

    # Start production environment
    docker compose -f docker-compose.prod.yml up -d

    print_success "Production environment started"
    print_status "Application available at: https://localhost"
}

# Function to show Docker stats
show_stats() {
    print_status "Docker resource usage:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
}

# Function to optimize Docker build cache
optimize_cache() {
    print_status "Optimizing Docker build cache..."

    # Create cache image
    docker build \
        --target deps \
        --tag ${IMAGE_NAME}:cache \
        --file Dockerfile \
        .

    print_success "Build cache optimized"
}

# Function to run security scan
security_scan() {
    print_status "Running security scan on Docker images..."

    if command -v trivy &> /dev/null; then
        trivy image ${IMAGE_NAME}:${TAG}
        trivy image ${IMAGE_NAME}:${PROD_TAG}
    else
        print_warning "Trivy not installed. Install it for security scanning:"
        print_status "https://aquasecurity.github.io/trivy/latest/getting-started/installation/"
    fi
}

# Function to show help
show_help() {
    echo "Request Hub - Docker Optimization Script"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  build-dev          Build development Docker image"
    echo "  build-prod         Build production Docker image"
    echo "  run-dev [--setup]  Start development environment"
    echo "  run-prod           Start production environment"
    echo "  cleanup [--aggressive] Clean up Docker resources"
    echo "  optimize-cache     Optimize Docker build cache"
    echo "  security-scan      Run security scan on images"
    echo "  stats              Show Docker resource usage"
    echo "  help               Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 build-dev"
    echo "  $0 run-dev --setup"
    echo "  $0 cleanup --aggressive"
}

# Main script logic
main() {
    case "$1" in
        "build-dev")
            check_docker
            build_dev
            ;;
        "build-prod")
            check_docker
            build_prod
            ;;
        "run-dev")
            check_docker
            run_dev "$2"
            ;;
        "run-prod")
            check_docker
            run_prod
            ;;
        "cleanup")
            check_docker
            cleanup "$2"
            ;;
        "optimize-cache")
            check_docker
            optimize_cache
            ;;
        "security-scan")
            check_docker
            security_scan
            ;;
        "stats")
            check_docker
            show_stats
            ;;
        "help"|"--help"|"-h"|"")
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
