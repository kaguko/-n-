const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middleware/auth');

const router = express.Router();

router.post(
  '/register',
  [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('full_name').notEmpty().withMessage('Full name is required')
  ],
  AuthController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  AuthController.login
);

router.get(
  '/profile',
  AuthMiddleware.authenticate,
  AuthController.getProfile
);

router.put(
  '/profile',
  AuthMiddleware.authenticate,
  AuthController.updateProfile
);

module.exports = router;
