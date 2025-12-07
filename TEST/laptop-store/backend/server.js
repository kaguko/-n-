require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Import routes
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

// Import middleware
const ErrorHandler = require('./middleware/errorHandler');
const db = require('./models/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Initialize database on startup
app.get('/api/init-db', async (req, res) => {
  try {
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const dataPath = path.join(__dirname, '../database/sample-data.sql');

    const schema = fs.readFileSync(schemaPath, 'utf8');
    const data = fs.readFileSync(dataPath, 'utf8');

    // Execute schema
    await db.exec(schema);
    console.log('Database schema initialized');

    // Execute sample data
    await db.exec(data);
    console.log('Sample data loaded');

    res.json({
      success: true,
      message: 'Database initialized successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handler
app.use(ErrorHandler.handle);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Initialize database at http://localhost:${PORT}/api/init-db`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await db.close();
  process.exit(0);
});
