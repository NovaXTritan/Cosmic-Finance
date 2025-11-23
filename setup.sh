#!/bin/bash

# Cosmic Finance Analyzer - Automated Setup Script
# This script automates the complete setup process

set -e  # Exit on error

echo "🌌 Cosmic Finance Analyzer - Automated Setup"
echo "=============================================="
echo ""

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Step 1: Check prerequisites
echo "Step 1: Checking prerequisites..."
echo ""

# Check Docker
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    print_success "Docker installed: $DOCKER_VERSION"
else
    print_error "Docker is not installed!"
    echo "Please install Docker from: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check Docker Compose
if command -v docker-compose &> /dev/null; then
    COMPOSE_VERSION=$(docker-compose --version)
    print_success "Docker Compose installed: $COMPOSE_VERSION"
else
    print_error "Docker Compose is not installed!"
    echo "Please install Docker Compose from: https://docs.docker.com/compose/install/"
    exit 1
fi

echo ""

# Step 2: Environment Configuration
echo "Step 2: Setting up environment..."
echo ""

if [ -f .env ]; then
    print_warning "Environment file (.env) already exists"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Keeping existing .env file"
    else
        rm .env
        setup_env=true
    fi
else
    setup_env=true
fi

if [ "$setup_env" = true ]; then
    echo "Please enter your configuration:"
    echo ""
    
    # Get API key
    read -p "Anthropic API Key (required for AI insights): " api_key
    
    if [ -z "$api_key" ]; then
        print_warning "No API key provided. AI insights will not work."
        print_info "You can add it later by editing the .env file"
        api_key="your-api-key-here"
    fi
    
    # Create .env file
    cat > .env << EOF
# Cosmic Finance Analyzer - Environment Configuration
# Generated on $(date)

# Anthropic API Key for Claude AI insights
ANTHROPIC_API_KEY=$api_key

# Backend Configuration
UPLOAD_DIR=/tmp/cosmic_uploads
REPORT_DIR=/tmp/cosmic_reports
LOG_LEVEL=INFO

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF
    
    print_success "Environment file created: .env"
fi

echo ""

# Step 3: Build containers
echo "Step 3: Building Docker containers..."
echo ""

print_info "This may take 5-10 minutes on first run..."

if docker-compose build; then
    print_success "Containers built successfully"
else
    print_error "Failed to build containers"
    exit 1
fi

echo ""

# Step 4: Start services
echo "Step 4: Starting services..."
echo ""

if docker-compose up -d; then
    print_success "Services started successfully"
else
    print_error "Failed to start services"
    exit 1
fi

echo ""

# Step 5: Wait for services to be ready
echo "Step 5: Waiting for services to be ready..."
echo ""

print_info "Checking backend health..."
max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
    if curl -f -s http://localhost:8000/api/health > /dev/null 2>&1; then
        print_success "Backend is ready!"
        break
    fi
    
    attempt=$((attempt + 1))
    if [ $attempt -eq $max_attempts ]; then
        print_error "Backend failed to start within timeout"
        echo "Check logs with: docker-compose logs backend"
        exit 1
    fi
    
    echo -n "."
    sleep 2
done

echo ""

print_info "Checking frontend health..."
sleep 5  # Give frontend a bit more time

if curl -f -s http://localhost:3000 > /dev/null 2>&1; then
    print_success "Frontend is ready!"
else
    print_warning "Frontend may still be starting..."
    print_info "Give it a minute and check: http://localhost:3000"
fi

echo ""
echo "=============================================="
echo ""
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo "Your Cosmic Finance Analyzer is now running:"
echo ""
echo "  📱 Frontend:  http://localhost:3000"
echo "  🔧 Backend:   http://localhost:8000"
echo "  📚 API Docs:  http://localhost:8000/docs"
echo ""
echo "Next steps:"
echo "  1. Open http://localhost:3000 in your browser"
echo "  2. Upload a financial document (PDF, Excel, CSV)"
echo "  3. Explore the cosmic-powered analysis!"
echo ""
echo "Useful commands:"
echo "  • View logs:     docker-compose logs -f"
echo "  • Stop services: docker-compose down"
echo "  • Restart:       docker-compose restart"
echo ""
echo "Need help? Check the documentation:"
echo "  • Quick Start:   cat QUICKSTART.md"
echo "  • Full README:   cat README.md"
echo "  • Deployment:    cat docs/DEPLOYMENT.md"
echo ""
echo -e "${BLUE}Happy analyzing! 💜${NC}"
echo ""
