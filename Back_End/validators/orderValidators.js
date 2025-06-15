const { body } = require('express-validator');

const checkoutValidation = [
  body('totalPrice').notEmpty().withMessage('Total price is required').isFloat({ min: 0 }).withMessage('Total price must be a positive number')
];

module.exports = { checkoutValidation };