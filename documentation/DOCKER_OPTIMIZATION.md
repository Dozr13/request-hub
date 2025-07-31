# Docker Optimization Guide

## Overview

This guide covers the comprehensive Docker optimizations implemented for the HTV Request Hub application, including multi-stage builds, caching strategies, security enhancements, and production-ready configurations.

## Key Optimizations

### 1. **Multi-Stage Builds**

- **Dependencies Stage**: Isolated dependency installation
- **Builder Stage**: Application compilation and build
- **Production Dependencies Stage**: Optimized production deps
- **Runner Stage**: Minimal production image

### 2. **Layer Caching**

- **Package Files First**: `package.json` and `yarn.lock` copied before source code
- **Dependency Isolation**: Dependencies installed in separate layer
- **Build Cache**: Leverages Docker BuildKit for better caching
- **Cache Images**: Dedicated cache images for faster rebuilds

### 3. **Security Enhancements**

- **Non-Root User**: Application runs as `nextjs` user (UID 1001)
- **Signal Handling**: `dumb-init` for proper process management
- **Security Headers**: Nginx configuration with security headers
- **Resource Limits**: CPU and memory limits for all containers

### 4. **Production Optimizations**

- **Standalone Mode**: Next.js standalone output for minimal runtime
- **Health Checks**: Comprehensive health monitoring
- **Load Balancing**: Nginx upstream configuration
- **Rate Limiting**: API and authentication rate limiting

## File Structure

```
├── Dockerfile                 # Production multi-stage build
├── Dockerfile.dev            # Development optimized build
├── docker-compose.yml        # Development environment
├── docker-compose.prod.yml   # Production environment
├── nginx.conf               # Production Nginx configuration
├── scripts/
│   └── docker-optimize.sh   # Docker management script
└── DOCKER_OPTIMIZATION.md   # This documentation
```

## Usage

### Development Environment

```bash
# Build development image
yarn docker:build-dev

# Start development environment
yarn docker:run-dev

# Start with database setup
yarn docker:run-dev --setup

# View container stats
yarn docker:stats

# Clean up resources
yarn docker:cleanup
```

### Production Environment

```bash
# Build production image
yarn docker:build-prod

# Start production environment
yarn docker:run-prod

# Security scan
yarn docker:security

# Optimize build cache
yarn docker:optimize
```

### Manual Docker Commands

```bash
# Development
docker-compose up -d
docker-compose down

# Production
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml down

# Build with BuildKit
DOCKER_BUILDKIT=1 docker build -t htv-app:production .
```

## Build Stages

### Stage 1: Dependencies (`deps`)

```dockerfile
FROM node:22-alpine AS deps
# Install dependencies with frozen lockfile
RUN yarn install --immutable --frozen-lockfile
```

### Stage 2: Builder (`builder`)

```dockerfile
FROM node:22-alpine AS builder
# Copy dependencies and build application
RUN yarn build
```

### Stage 3: Production Dependencies (`production-deps`)

```dockerfile
FROM node:22-alpine AS production-deps
# Install only production dependencies
RUN yarn install --immutable --frozen-lockfile --production
```

### Stage 4: Runner (`runner`)

```dockerfile
FROM node:22-alpine AS runner
# Minimal production image with security
USER nextjs
CMD ["/app/start.sh"]
```

## Security Features

### Container Security

- **Non-root user**: Application runs as `nextjs` (UID 1001)
- **Signal handling**: `dumb-init` for proper process management
- **Resource limits**: CPU and memory constraints
- **Health checks**: Comprehensive monitoring

### Network Security

- **Rate limiting**: API (10 req/s) and auth (5 req/min) limits
- **Security headers**: XSS protection, content type options
- **HTTPS redirect**: Automatic HTTP to HTTPS redirection
- **SSL/TLS**: Modern cipher suites and protocols

### Application Security

- **Environment isolation**: Separate dev/prod configurations
- **Secret management**: Environment variable injection
- **Access control**: Network isolation with custom subnets

## Performance Optimizations

### Build Performance

- **Layer caching**: Optimized layer order for better caching
- **BuildKit**: Leverages Docker BuildKit for faster builds
- **Cache images**: Dedicated cache images for dependencies
- **Parallel builds**: Multi-stage builds for parallelization

### Runtime Performance

- **Standalone mode**: Next.js standalone for minimal runtime
- **Static file caching**: Nginx caching for static assets
- **Gzip compression**: Automatic compression for text files
- **Load balancing**: Least-connection load balancing

### Resource Optimization

- **Memory limits**: 1GB app, 512MB DB, 256MB Redis
- **CPU limits**: Proportional CPU allocation
- **Storage optimization**: Efficient volume management
- **Network optimization**: Custom subnet configuration

## Production Deployment

### Environment Setup

```bash
# Create production environment file
cp .env.example .env.production

# Configure production variables
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
# ... other production variables
```

### Deployment Commands

```bash
# Build and deploy
yarn docker:build-prod
yarn docker:run-prod

# Monitor deployment
yarn docker:stats

# Check health
curl https://localhost/health
```

### Scaling Configuration

```yaml
deploy:
  replicas: 2
  update_config:
    parallelism: 1
    delay: 10s
    order: start-first
  restart_policy:
    condition: on-failure
    delay: 5s
    max_attempts: 3
```

## Monitoring & Health Checks

### Health Check Endpoints

- **Application**: `http://localhost:3000/api/health`
- **Database**: `pg_isready -U postgres`
- **Redis**: `redis-cli ping`
- **Nginx**: `http://localhost/health`

### Health Check Configuration

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD /app/healthcheck.sh
```

### Monitoring Scripts

```bash
# View container stats
yarn docker:stats

# Check container health
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# View logs
docker-compose logs -f app
```

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear build cache
yarn docker:cleanup --aggressive

# Rebuild without cache
docker build --no-cache -t htv-app:latest .
```

#### Container Startup Issues

```bash
# Check container logs
docker-compose logs app

# Check health status
docker ps -a

# Restart services
docker-compose restart
```

#### Performance Issues

```bash
# Check resource usage
yarn docker:stats

# Optimize cache
yarn docker:optimize

# Clean up resources
yarn docker:cleanup
```

### Debug Commands

```bash
# Enter running container
docker exec -it htv-app sh

# Check file permissions
docker exec htv-app ls -la /app

# Test database connection
docker exec htv-postgres psql -U postgres -d htv_request_hub -c "SELECT 1;"
```

## Performance Metrics

### Build Times

- **Development**: ~2-3 minutes (with cache)
- **Production**: ~4-5 minutes (with cache)
- **Cold build**: ~8-10 minutes (no cache)

### Image Sizes

- **Development**: ~800MB
- **Production**: ~200MB
- **Base layer**: ~50MB

### Resource Usage

- **Memory**: 512MB-1GB per container
- **CPU**: 0.25-1.0 cores per container
- **Storage**: 2-5GB total

## Future Enhancements

### Planned Optimizations

1. **Multi-platform builds**: ARM64 support
2. **Distroless images**: Even smaller production images
3. **Kubernetes manifests**: K8s deployment files
4. **CI/CD integration**: Automated Docker builds
5. **Monitoring stack**: Prometheus + Grafana

### Advanced Features

1. **Service mesh**: Istio integration
2. **Auto-scaling**: Horizontal pod autoscaling
3. **Blue-green deployment**: Zero-downtime deployments
4. **Canary releases**: Gradual rollout strategy

---

_This Docker optimization provides a robust, secure, and performant containerized environment for the HTV Request Hub application._
