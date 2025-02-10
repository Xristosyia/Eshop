const { body } = require('express-validator');

// Validation for product inputs
const productValidation = [
  body('name').notEmpty().withMessage('Name is required').isLength({ max: 100 }).withMessage('Name should be less than 100 characters'),
  body('price').notEmpty().withMessage('Price is required').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('description').notEmpty().withMessage('Description is required').isLength({ max: 500 }).withMessage('Description should be less than 500 characters'),
  body('category').optional().isLength({ max: 50 }).withMessage('Category should be less than 50 characters'),
];

module.exports = { productValidation };