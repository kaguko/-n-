const db = require('./database');

class Product {
  static async findAll(filters = {}) {
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    let paramCount = 1;

    // Search filter
    if (filters.search) {
      query += ` AND (LOWER(name) LIKE LOWER($${paramCount}) OR LOWER(description) LIKE LOWER($${paramCount}))`;
      params.push(`%${filters.search}%`);
      paramCount++;
    }

    // Brand filter
    if (filters.brand) {
      query += ` AND brand = $${paramCount}`;
      params.push(filters.brand);
      paramCount++;
    }

    // Category filter
    if (filters.category_id) {
      query += ` AND category_id = $${paramCount}`;
      params.push(filters.category_id);
      paramCount++;
    }

    // Price range filter
    if (filters.min_price) {
      query += ` AND price >= $${paramCount}`;
      params.push(filters.min_price * 1000000); // Convert to actual price
      paramCount++;
    }

    if (filters.max_price) {
      query += ` AND price <= $${paramCount}`;
      params.push(filters.max_price * 1000000); // Convert to actual price
      paramCount++;
    }

    query += ' ORDER BY name';
    
    return await db.all(query, params);
  }

  static async findById(id) {
    return await db.get('SELECT * FROM products WHERE id = $1', [id]);
  }

  static async findByCategory(categoryId) {
    return await db.all('SELECT * FROM products WHERE category_id = $1 ORDER BY name', [categoryId]);
  }

  static async create(productData) {
    const { name, description, price, stock, category_id, image, specs } = productData;
    const result = await db.run(
      'INSERT INTO products (name, description, price, stock, category_id, image, specs) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [name, description, price, stock, category_id, image, specs]
    );
    return result.rows[0]?.id;
  }

  static async update(id, productData) {
    const { name, description, price, stock, image, specs } = productData;
    return await db.run(
      'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, image = $5, specs = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7',
      [name, description, price, stock, image, specs, id]
    );
  }

  static async delete(id) {
    return await db.run('DELETE FROM products WHERE id = $1', [id]);
  }

  static async search(query) {
    return await db.all(
      'SELECT * FROM products WHERE LOWER(name) LIKE LOWER($1) OR LOWER(description) LIKE LOWER($1)',
      [`%${query}%`]
    );
  }

  static async getBrands() {
    return await db.all('SELECT DISTINCT brand FROM products WHERE brand IS NOT NULL ORDER BY brand');
  }
}

module.exports = Product;

