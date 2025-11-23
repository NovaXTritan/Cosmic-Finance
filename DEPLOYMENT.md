# 🚀 Quick Deployment Guide

## Deploy to Production in 5 Minutes

### Prerequisites
- Docker & Docker Compose installed
- Git installed
- Port 3000 and 8000 available

### Option 1: One-Command Deploy (Recommended)

```bash
# Clone and deploy
git clone <your-repo-url>
cd cosmic-financials
chmod +x quick-start.sh
./quick-start.sh
```

Visit **http://localhost:3000** 🎉

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Option 3: Docker Deploy

```bash
docker-compose up --build
```

---

## 🌐 Cloud Deployment

### Deploy to Vercel (Frontend)

1. Push to GitHub
2. Import project to Vercel
3. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```
4. Deploy!

### Deploy to Railway/Render (Backend)

1. Connect GitHub repo
2. Set root directory to `/backend`
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Deploy!

### Deploy to AWS/DigitalOcean (Full Stack)

```bash
# On your server
git clone <your-repo-url>
cd cosmic-financials

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Deploy
docker-compose up -d

# Setup reverse proxy (optional)
# nginx, Caddy, or Traefik for HTTPS
```

---

## 🔒 Environment Variables

### Backend (.env)
```env
# Optional: AI Integration
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here

# Optional: Database (for persistence)
DATABASE_URL=postgresql://user:pass@localhost/dbname

# Optional: File Storage
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_BUCKET_NAME=your_bucket
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📊 Performance Optimization

### Production Build
```bash
# Frontend
cd frontend
npm run build
npm start

# Backend
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Docker Production
```yaml
# docker-compose.prod.yml
services:
  backend:
    environment:
      - WORKERS=4
      - LOG_LEVEL=warning
    restart: always
  
  frontend:
    environment:
      - NODE_ENV=production
    restart: always
```

---

## 🔍 Monitoring & Logs

```bash
# View logs
docker-compose logs -f

# Backend logs only
docker-compose logs -f backend

# Frontend logs only
docker-compose logs -f frontend

# Check status
docker-compose ps
```

---

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Change ports in docker-compose.yml
ports:
  - "3001:3000"  # Frontend
  - "8001:8000"  # Backend
```

### Build Fails
```bash
# Clean and rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### Frontend Can't Connect to Backend
- Check `NEXT_PUBLIC_API_URL` in frontend/.env.local
- Ensure CORS is enabled in backend
- Verify both services are running

---

## 📦 Update & Maintenance

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up --build -d

# Backup data (if using volumes)
docker-compose down
tar -czf backup-$(date +%Y%m%d).tar.gz data/
```

---

## 🔐 Security Best Practices

1. **Use HTTPS in production** (Let's Encrypt + Caddy/Nginx)
2. **Set strong secrets** for session/JWT tokens
3. **Rate limit API** endpoints
4. **Sanitize file uploads** (already implemented)
5. **Regular updates** of dependencies
6. **Monitor logs** for suspicious activity

---

## 🎯 Production Checklist

- [ ] Environment variables set
- [ ] HTTPS configured
- [ ] Database backups scheduled
- [ ] Monitoring setup (optional: Sentry, Datadog)
- [ ] CDN configured for static assets (optional)
- [ ] API rate limiting enabled
- [ ] Error tracking configured
- [ ] Logs aggregation setup

---

## 📚 Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

**Need Help?** Open an issue on GitHub or contact support.
