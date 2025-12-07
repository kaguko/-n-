const Order = require('../models/Order');
const Product = require('../models/Product');
const { validationResult } = require('express-validator');

class OrderController {
  static async getAll(req, res) {
    try {
      const filters = {};
      
      if (req.user.role === 'customer') {
        filters.user_id = req.user.id;
      } else if (req.query.user_id) {
        filters.user_id = req.query.user_id;
      }

      if (req.query.status) {
        filters.status = req.query.status;
      }

      const orders = await Order.findAll(filters);
      res.json({
        success: true,
        data: orders
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      // Check authorization
      if (req.user.role === 'customer' && order.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const items = await Order.getItems(id);
      order.items = items;

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  static async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { items, payment_method, shipping_address, shipping_phone, notes } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Order items cannot be empty'
        });
      }

      let total_amount = 0;

      // Calculate total and verify products
      for (const item of items) {
        const product = await Product.findById(item.product_id);
        if (!product) {
          return res.status(400).json({
            success: false,
            message: `Product ${item.product_id} not found`
          });
        }

        if (product.stock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${product.name}`
          });
        }

        total_amount += product.price * item.quantity;
      }

      // Create order
      const orderId = await Order.create({
        user_id: req.user.id,
        total_amount,
        payment_method,
        shipping_address,
        shipping_phone,
        notes
      });

      // Add order items
      for (const item of items) {
        const product = await Product.findById(item.product_id);
        await Order.addItem(orderId, item.product_id, item.quantity, product.price);

        // Update product stock
        await Product.update(item.product_id, {
          stock: product.stock - item.quantity
        });
      }

      const order = await Order.findById(orderId);
      order.items = await Order.getItems(orderId);

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      await Order.updateStatus(id, status);
      const updatedOrder = await Order.findById(id);

      res.json({
        success: true,
        message: 'Order status updated',
        data: updatedOrder
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  static async getStatistics(req, res) {
    try {
      const stats = await Order.getStatistics();
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = OrderController;
