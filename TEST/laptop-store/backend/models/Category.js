const db = require('./database');

class Category {
  static async findAll() {
    return await db.all('SELECT * FROM categories ORDER BY name');
  }

  static async findById(id) {
    return await db.get('SELECT * FROM categories WHERE id = $1', [id]);
  }

  static async create(categoryData) {
    const { name, description, image } = categoryData;
    const result = await db.run(
      'INSERT INTO categories (name, description, image) VALUES ($1, $2, $3) RETURNING id',
      [name, description, image]
    );
    return result.rows[0]?.id;
  }

  static async update(id, categoryData) {
    const { name, description, image } = categoryData;
    return await db.run(
      'UPDATE categories SET name = $1, description = $2, image = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4',
      [name, description, image, id]
    );
  }

  static async delete(id) {
    return await db.run('DELETE FROM categories WHERE id = $1', [id]);
  }
}

module.exports = Category;

