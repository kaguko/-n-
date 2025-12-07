const express = require('express');
const { body } = require('express-validator');
const OrderController = require('../controllers/OrderController');
const AuthMiddleware = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.get(
  '/',
  AuthMiddleware.authenticate,
  OrderController.getAll
);

router.get(
  '/:id',
  AuthMiddleware.authenticate,
  OrderController.getById
);

router.post(
  '/',
  AuthMiddleware.authenticate,
  [
    body('items').isArray({ min: 1 }).withMessage('Order items are required'),
    body('shipping_address').notEmpty().withMessage('Shipping address is required'),
    body('shipping_phone').notEmpty().withMessage('Shipping phone is required')
  ],
  OrderController.create
);

// Admin only
router.put(
  '/:id/status',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize(['admin']),
  [
    body('status').notEmpty().withMessage('Status is required')
  ],
  OrderController.updateStatus
);

router.get(
  '/admin/statistics',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize(['admin']),
  OrderController.getStatistics
);

module.exports = router;
