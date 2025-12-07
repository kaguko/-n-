# Production Deployment Guide

Hướng dẫn triển khai ứng dụng lên production.

## Deployment Options

### Option 1: DigitalOcean (Recommended for Beginners)

#### 1. Tạo Droplet

1. Vào [DigitalOcean](https://www.digitalocean.com/)
2. Click "Create" → "Droplets"
3. Chọn:
   - Image: Ubuntu 22.04 LTS
   - Plan: Basic ($5/month)
   - Region: Singapore hoặc Tokyo
   - Authentication: SSH Key
   - Hostname: `laptop-store`
4. Click "Create Droplet"

#### 2. SSH Connect

```bash
ssh root@YOUR_DROPLET_IP
```

#### 3. Setup Server

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install Git
apt install -y git

# Install Nginx (reverse proxy)
apt install -y nginx

# Install SQLite
apt install -y sqlite3
```

#### 4. Clone Repository

```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/laptop-store.git
cd laptop-store
```

#### 5. Setup Environment Files

```bash
# Backend
cd backend
cp .env.example .env
nano .env
```

**Update .env:**
```
NODE_ENV=production
PORT=5000
DATABASE_PATH=/var/www/laptop-store/database/laptop-store.db
JWT_SECRET=your-super-secret-key-here
CORS_ORIGIN=https://yourdomain.com
```

```bash
# Install backend dependencies
npm install --production

# Frontend
cd ../frontend
cp .env.example .env.production
```

**Update .env.production:**
```
REACT_APP_API_URL=https://api.yourdomain.com
```

```bash
npm install --production
npm run build
```

#### 6. Setup Nginx Reverse Proxy

**File: `/etc/nginx/sites-available/laptop-store`**

```nginx
upstream backend {
  server localhost:5000;
}

server {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;
  
  # Redirect HTTP to HTTPS
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name yourdomain.com www.yourdomain.com;
  
  # SSL certificates (Let's Encrypt)
  ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers HIGH:!aNULL:!MD5;
  
  # Frontend
  location / {
    root /var/www/laptop-store/frontend/build;
    try_files $uri /index.html;
  }
  
  # Backend API
  location /api {
    proxy_pass http://backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
  
  # Compression
  gzip on;
  gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;
}
```

**Enable site:**
```bash
ln -s /etc/nginx/sites-available/laptop-store /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

#### 7. Setup SSL Certificate (Let's Encrypt)

```bash
apt install -y certbot python3-certbot-nginx
certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com
```

#### 8. Setup Process Manager (PM2)

```bash
npm install -g pm2

# Create PM2 config
cat > /var/www/laptop-store/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'laptop-store-backend',
    script: '/var/www/laptop-store/backend/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    },
    error_file: '/var/log/pm2/err.log',
    out_file: '/var/log/pm2/out.log'
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

#### 9. Monitor & Logs

```bash
# View logs
pm2 logs

# Monitor resources
pm2 monit

# Restart app
pm2 restart all

# Stop app
pm2 stop all
```

### Option 2: Heroku (Quick Deployment)

#### 1. Install Heroku CLI

```bash
npm install -g heroku
heroku login
```

#### 2. Create Heroku App

```bash
cd laptop-store
heroku create your-laptop-store-app
```

#### 3. Set Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
heroku config:set DATABASE_PATH=/app/database/laptop-store.db
```

#### 4. Create Procfile

**File: `Procfile`**
```
web: node backend/server.js
```

#### 5. Deploy

```bash
git push heroku main
```

#### 6. View Logs

```bash
heroku logs --tail
```

### Option 3: Docker + Vercel (Modern Approach)

#### 1. Create Dockerfile

**File: `Dockerfile`**
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Frontend
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install --production
RUN cd frontend && npm run build

COPY . .

EXPOSE 5000 3000

CMD ["node", "backend/server.js"]
```

#### 2. Build & Push to Docker Hub

```bash
docker build -t your-username/laptop-store:latest .
docker push your-username/laptop-store:latest
```

#### 3. Deploy to DigitalOcean App Platform

1. Vào [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Select "GitHub" repository
4. Configure build command
5. Deploy

## Post-Deployment Checklist

### Security

- [ ] HTTPS enabled
- [ ] Strong JWT secret configured
- [ ] Database backups enabled
- [ ] Admin password strong
- [ ] API rate limiting configured
- [ ] CORS properly restricted
- [ ] Environment variables secured

### Performance

- [ ] Gzip compression enabled
- [ ] Database indexes created
- [ ] Redis caching configured
- [ ] CDN for static files
- [ ] Image optimization done
- [ ] Database queries optimized

### Monitoring

- [ ] Application monitoring (PM2, New Relic)
- [ ] Error tracking (Sentry)
- [ ] Log aggregation (LogRocket)
- [ ] Uptime monitoring (Pingdom)
- [ ] Performance monitoring (DataDog)

### Backup & Recovery

- [ ] Automated database backups
- [ ] Code repository backed up
- [ ] Disaster recovery plan
- [ ] Recovery time objective (RTO)
- [ ] Recovery point objective (RPO)

## Deployment Script

**File: `deploy.sh`**

```bash
#!/bin/bash

set -e

echo "🚀 Starting deployment..."

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install --production
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install --production
npm run build
cd ..

# Restart backend
echo "🔄 Restarting backend..."
pm2 restart all

echo "✅ Deployment completed!"
```

**Make executable:**
```bash
chmod +x deploy.sh
```

**Run deployment:**
```bash
./deploy.sh
```

## CI/CD Pipeline with GitHub Actions

**File: `.github/workflows/deploy.yml`**

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/laptop-store
            git pull origin main
            cd backend && npm install && cd ..
            cd frontend && npm install && npm run build && cd ..
            pm2 restart all
```

## Monitoring & Logging

### PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# Save logs
pm2 logs > server.log

# Clear logs
pm2 flush
```

### Application Monitoring

**Option 1: Sentry (Error Tracking)**
```bash
npm install @sentry/node
```

**Option 2: New Relic**
```bash
npm install newrelic
```

**Option 3: DataDog**
```bash
npm install datadog-tracer
```

## Scaling

### Horizontal Scaling

```bash
# Multiple instances
pm2 start app.js -i max

# Load balancer with Nginx
# (See Nginx config above)
```

### Vertical Scaling

```bash
# Upgrade droplet
# Increase RAM/CPU via DigitalOcean dashboard
```

### Database Optimization

```sql
-- Add indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_date ON orders(created_at);
```

## Rollback Procedure

```bash
# If deployment fails

# Check current version
git log --oneline -5

# Rollback to previous commit
git revert HEAD
git push origin main

# Or reset to specific version
git reset --hard v1.0.0
git push -f origin main

# Restart application
pm2 restart all
```

## Domain & DNS Setup

1. **Purchase domain** from:
   - Namecheap
   - GoDaddy
   - Route53

2. **Point DNS to DigitalOcean:**
   - Update nameservers to:
     - ns1.digitalocean.com
     - ns2.digitalocean.com
     - ns3.digitalocean.com

3. **Configure DNS in DigitalOcean:**
   - Add A record → Droplet IP

## Cost Estimation

| Service | Price | Notes |
|---------|-------|-------|
| DigitalOcean Droplet | $5-20/mo | Basic-Standard |
| SSL Certificate | $0 | Let's Encrypt (free) |
| Domain | $10-15/yr | Varies by extension |
| Backups | $1-5/mo | Optional |
| **Total** | **$18-50/mo** | **Very affordable** |

## Troubleshooting

### Application not starting
```bash
# Check logs
pm2 logs

# Check port
lsof -i :5000

# Restart
pm2 restart all
```

### Database locked
```bash
# Check SQLite locks
rm /path/to/database.db-wal
rm /path/to/database.db-shm
```

### SSL Certificate issues
```bash
# Renew certificate
certbot renew

# Force renewal
certbot renew --force-renewal
```

### Out of memory
```bash
# Increase swap
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```

## Maintenance

### Regular Tasks

**Daily:**
- Monitor application logs
- Check error rates
- Verify uptime

**Weekly:**
- Database backup verification
- Security updates
- Performance review

**Monthly:**
- Update dependencies
- Review analytics
- Optimize database

**Quarterly:**
- Security audit
- Performance tuning
- Capacity planning

## Success Indicators

✅ Application live at your domain
✅ HTTPS working
✅ Database persisting data
✅ Logs available
✅ Auto-restart on crash
✅ Monitoring active
✅ Backups running

## Support Resources

- [DigitalOcean Docs](https://docs.digitalocean.com/)
- [Nginx Configuration](http://nginx.org/en/docs/)
- [Node.js Production](https://nodejs.org/en/docs/guides/nodejs-web-app/)
- [Let's Encrypt](https://letsencrypt.org/)

Ready for production! 🎉
