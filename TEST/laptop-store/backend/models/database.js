const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin123',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'laptop_store',
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
});

class DatabaseWrapper {
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      pool.query(sql, params, (err, result) => {
        if (err) reject(err);
        else resolve({ rows: result.rows, rowCount: result.rowCount });
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      pool.query(sql, params, (err, result) => {
        if (err) reject(err);
        else resolve(result.rows[0]);
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      pool.query(sql, params, (err, result) => {
        if (err) reject(err);
        else resolve(result.rows || []);
      });
    });
  }

  exec(sql) {
    return new Promise((resolve, reject) => {
      pool.query(sql, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      pool.end((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

console.log('✅ Connected to PostgreSQL database');
module.exports = new DatabaseWrapper();

