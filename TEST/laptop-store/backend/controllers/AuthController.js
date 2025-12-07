const User = require('../models/User');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

class AuthController {
  static async register(req, res) {
    try {
      console.log('📝 Register request:', req.body);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('❌ Validation errors:', errors.array());
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { username, email, password, full_name, phone } = req.body;

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        console.log('❌ Email already exists:', email);
        return res.status(400).json({
          success: false,
          message: 'Email đã được sử dụng'
        });
      }

      const existingUsername = await User.findByUsername(username);
      if (existingUsername) {
        console.log('❌ Username already exists:', username);
        return res.status(400).json({
          success: false,
          message: 'Tên đăng nhập đã tồn tại'
        });
      }

      console.log('✓ Creating user:', { username, email, full_name });
      const userId = await User.create({
        username,
        email,
        password,
        full_name,
        phone
      });

      const user = await User.findById(userId);
      const token = jwt.encode(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET
      );

      console.log('✅ User registered successfully:', user.email);
      res.status(201).json({
        success: true,
        message: 'Đăng ký thành công',
        data: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            full_name: user.full_name,
            role: user.role
          },
          token
        }
      });
    } catch (error) {
      console.error('❌ Register error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server: ' + error.message
      });
    }
  }

  static async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { email, password } = req.body;
      console.log(`🔑 Login attempt: ${email}`);

      const user = await User.findByEmail(email);
      if (!user) {
        console.log(`❌ User not found: ${email}`);
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      console.log(`✓ User found: ${user.email}`);
      
      // Verify password
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        console.log(`❌ Password invalid for: ${email}`);
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      console.log(`✓ Password valid for: ${email}`);
      const token = jwt.encode(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET
      );

      console.log(`✓ Token generated for: ${email}`);
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            full_name: user.full_name,
            role: user.role
          },
          token
        }
      });
    } catch (error) {
      console.error('❌ Login error:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  static async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  static async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const { full_name, phone, address, city, province, zip_code } = req.body;

      await User.update(userId, {
        full_name,
        phone,
        address,
        city,
        province,
        zip_code
      });

      const user = await User.findById(userId);

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = AuthController;
