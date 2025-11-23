#!/bin/bash

# Cosmic Finance Analyzer - Quick Start Script
# This script sets up and runs the application

set -e

echo "🌌 Cosmic Finance Analyzer - Quick Start"
echo "========================================="
echo ""

# Check for Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose not found. Please install Docker Compose first."
    echo "   Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose found"
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file and add your ANTHROPIC_API_KEY"
    echo ""
    read -p "Press Enter to open .env file in default editor (or Ctrl+C to exit)..."
    ${EDITOR:-nano} .env
    echo ""
fi

echo "🔨 Building Docker images..."
cd docker
docker-compose build

echo ""
echo "🚀 Starting services..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo ""
    echo "✅ Application is running!"
    echo ""
    echo "📱 Access the application:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:8000"
    echo "   API Docs: http://localhost:8000/docs"
    echo ""
    echo "📊 View logs:"
    echo "   docker-compose logs -f"
    echo ""
    echo "🛑 Stop services:"
    echo "   docker-compose down"
    echo ""
else
    echo "❌ Failed to start services. Check logs:"
    echo "   docker-compose logs"
    exit 1
fi

# Ask if user wants to view logs
read -p "View logs now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose logs -f
fi
