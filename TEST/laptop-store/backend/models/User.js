const db = require('./database');
const bcrypt = require('bcryptjs');

class User {
  static async findAll() {
    return await db.all('SELECT id, username, email, full_name, phone, role, is_active, created_at FROM users');
  }

  static async findById(id) {
    return await db.get(
      'SELECT id, username, email, full_name, phone, address, city, province, zip_code, role, is_active, created_at FROM users WHERE id = $1',
      [id]
    );
  }

  static async findByEmail(email) {
    return await db.get('SELECT * FROM users WHERE email = $1', [email]);
  }

  static async findByUsername(username) {
    return await db.get('SELECT * FROM users WHERE username = $1', [username]);
  }

  static async create(userData) {
    const { username, email, password, full_name, phone } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.run(
      'INSERT INTO users (username, email, password, full_name, phone, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [username, email, hashedPassword, full_name, phone, 'customer']
    );
    return result.rows?.[0]?.id || result.id;
  }

  static async update(id, userData) {
    const updates = [];
    const values = [];
    let paramCount = 1;

    Object.keys(userData).forEach(key => {
      if (userData[key] !== undefined) {
        updates.push(`${key} = $${paramCount}`);
        values.push(userData[key]);
        paramCount++;
      }
    });

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount}`;
    return await db.run(sql, values);
  }

  static async delete(id) {
    return await db.run('DELETE FROM users WHERE id = $1', [id]);
  }

  verifyPassword(plainPassword) {
    return bcrypt.compareSync(plainPassword, this.password);
  }
}

module.exports = User;

