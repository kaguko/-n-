#!/bin/bash
echo "🚀 Starting Laptop Store..."
echo ""

# Start Backend
echo "📦 Starting Backend..."
cd e:/TEST/laptop-store/backend
node server.js &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
echo ""

# Wait a bit for backend to start
sleep 2

# Initialize Database
echo "💾 Initializing Database..."
curl -s http://localhost:5000/api/init-db | jq .
echo ""

# Start Frontend
echo "🎨 Starting Frontend..."
cd e:/TEST/laptop-store/frontend
npm start
