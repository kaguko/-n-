const db = require('./database');

class Order {
  static async findAll() {
    return await db.all('SELECT * FROM orders ORDER BY created_at DESC');
  }

  static async findById(id) {
    return await db.get('SELECT * FROM orders WHERE id = $1', [id]);
  }

  static async findByUserId(userId) {
    return await db.all('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  }

  static async create(orderData) {
    const { user_id, total_amount, status, notes } = orderData;
    const result = await db.run(
      'INSERT INTO orders (user_id, total_amount, status, notes) VALUES ($1, $2, $3, $4) RETURNING id',
      [user_id, total_amount, status || 'pending', notes]
    );
    return result.rows[0]?.id;
  }

  static async update(id, orderData) {
    const { status, notes } = orderData;
    return await db.run(
      'UPDATE orders SET status = $1, notes = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
      [status, notes, id]
    );
  }

  static async delete(id) {
    return await db.run('DELETE FROM orders WHERE id = $1', [id]);
  }

  static async addItem(orderId, productId, quantity, price) {
    return await db.run(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
      [orderId, productId, quantity, price]
    );
  }

  static async getItems(orderId) {
    return await db.all(
      `SELECT oi.*, p.name, p.image FROM order_items oi 
       JOIN products p ON oi.product_id = p.id WHERE oi.order_id = $1`,
      [orderId]
    );
  }
}

module.exports = Order;

