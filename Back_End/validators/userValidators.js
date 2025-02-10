const { body } = require('express-validator');

// Validation for user inputs
const userRegistrationValidator = [
  body('name').notEmpty().withMessage('Name is required').isLength({ max: 100 }).withMessage('Name should be less than 100 characters'),
  body('email').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

module.exports = { userRegistrationValidator };