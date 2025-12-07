const path = require('path');
process.chdir(path.join(__dirname));
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');

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

// Reset and initialize database
app.get('/api/reset-db', async (req, res) => {
  try {
    const dbPath = path.join(__dirname, '../database/laptop-store.db');
    
    // Drop all tables
    await db.run('DROP TABLE IF EXISTS order_items');
    await db.run('DROP TABLE IF EXISTS orders');
    await db.run('DROP TABLE IF EXISTS cart_items');
    await db.run('DROP TABLE IF EXISTS reviews');
    await db.run('DROP TABLE IF EXISTS products');
    await db.run('DROP TABLE IF EXISTS categories');
    await db.run('DROP TABLE IF EXISTS users');
    
    console.log('All tables dropped');

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
      message: 'Database reset and initialized successfully',
      credentials: {
        email: 'admin@example.com',
        password: 'admin123'
      }
    });
  } catch (error) {
    console.error('Reset DB Error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Initialize database on startup
app.get('/api/init-db', async (req, res) => {
  try {
    const schemaPath = path.join(__dirname, './database/schema.sql');
    const dataPath = path.join(__dirname, './database/sample-data.sql');

    // Drop existing tables to avoid duplicate constraint errors
    const dropTablesSQL = `
      DROP TABLE IF EXISTS cart_items CASCADE;
      DROP TABLE IF EXISTS reviews CASCADE;
      DROP TABLE IF EXISTS order_items CASCADE;
      DROP TABLE IF EXISTS orders CASCADE;
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS categories CASCADE;
    `;
    
    await db.exec(dropTablesSQL);
    console.log('✅ Dropped all existing tables');

    const schema = fs.readFileSync(schemaPath, 'utf8');
    const data = fs.readFileSync(dataPath, 'utf8');

    // Execute schema
    await db.exec(schema);
    console.log('✅ Database schema initialized');

    // Execute sample data
    await db.exec(data);
    console.log('✅ Sample data loaded');

    res.json({
      success: true,
      message: 'Database initialized successfully',
      credentials: {
        email: 'admin@example.com',
        password: 'admin123'
      }
    });
  } catch (error) {
    console.error('Init DB Error:', error.message);
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
const server = app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📝 Initialize database at http://localhost:${PORT}/api/init-db`);
});

// Remove SIGINT handler to prevent auto-shutdown
// process.on('SIGINT', async () => {
//   console.log('\n👋 Shutting down gracefully...');
//   server.close();
//   await db.close();
//   process.exit(0);
// });
