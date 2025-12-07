const express = require('express');
const { body } = require('express-validator');
const ProductController = require('../controllers/ProductController');
const AuthMiddleware = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', ProductController.getAll);
router.get('/brands', ProductController.getBrands);
router.get('/:id', ProductController.getById);

// Admin routes
router.post(
  '/',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize(['admin']),
  [
    body('name').notEmpty().withMessage('Product name is required'),
    body('category_id').isInt().withMessage('Category ID must be an integer'),
    body('brand').notEmpty().withMessage('Brand is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number')
  ],
  ProductController.create
);

router.put(
  '/:id',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize(['admin']),
  ProductController.update
);

router.delete(
  '/:id',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize(['admin']),
  ProductController.delete
);

module.exports = router;
