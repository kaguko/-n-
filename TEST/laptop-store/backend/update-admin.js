const db = require('./models/database');

async function updateAdmin() {
  try {
    const query = `
      UPDATE users 
      SET email = ?, password = ?
      WHERE username = ?
    `;
    
    const result = await db.run(
      query, 
      ['admin@example.com', '$2a$10$XjltcJkDGXnQ7wmc/y6xKeCW.cgvVx4iuM/Lp8XwYfUQS8JWC/.ta', 'admin']
    );
    
    console.log('✅ Admin updated:', result.changes, 'rows');
    
    // Kiểm tra
    const admin = await db.get('SELECT id, username, email, role FROM users WHERE username = ?', ['admin']);
    console.log('✅ Admin account:', admin);
    console.log('\n✅ Bạn có thể đăng nhập với:');
    console.log('   Email: admin@example.com');
    console.log('   Password: admin123');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

updateAdmin();
