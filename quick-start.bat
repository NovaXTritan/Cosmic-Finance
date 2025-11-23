@echo off
REM Cosmic Financials - Quick Start Script for Windows

echo 🌌 Cosmic Financials - Quick Start
echo ==================================
echo.

REM Check if Docker is running
docker version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker Desktop first.
    echo Visit: https://docs.docker.com/get-docker/
    pause
    exit /b 1
)

docker-compose version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose is not installed.
    pause
    exit /b 1
)

echo ✅ Docker and Docker Compose are available
echo.

REM Create environment files if they don't exist
if not exist backend\.env (
    echo 📝 Creating backend\.env from template...
    copy backend\.env.example backend\.env
)

if not exist frontend\.env.local (
    echo 📝 Creating frontend\.env.local from template...
    copy frontend\.env.example frontend\.env.local
)

echo.
echo 🚀 Building and starting services...
echo This may take a few minutes on first run...
echo.

REM Build and start services
docker-compose up --build -d

echo.
echo ⏳ Waiting for services to be ready...
timeout /t 10 /nobreak >nul

echo.
echo ✅ Services should be running!
echo.
echo 🌐 Access your application:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:8000
echo    API Docs: http://localhost:8000/docs
echo.
echo 📊 To view logs:
echo    docker-compose logs -f
echo.
echo 🛑 To stop services:
echo    docker-compose down
echo.
echo 🌌 Happy analyzing!
echo.
pause
