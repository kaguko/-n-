const express = require('express');
const { body } = require('express-validator');
const CategoryController = require('../controllers/CategoryController');
const AuthMiddleware = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);

// Admin routes
router.post(
  '/',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize(['admin']),
  [
    body('name').notEmpty().withMessage('Category name is required')
  ],
  CategoryController.create
);

router.put(
  '/:id',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize(['admin']),
  CategoryController.update
);

router.delete(
  '/:id',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize(['admin']),
  CategoryController.delete
);

module.exports = router;
