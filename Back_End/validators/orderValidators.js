const { body } = require('express-validator');

// Validation for order inputs
const checkoutValidation = [
  body('shippingAddress').notEmpty().withMessage('Shipping address is required').isLength({ max: 200 }).withMessage('Address should be less than 200 characters'),
  body('paymentMethod').notEmpty().withMessage('Payment method is required').isIn(['credit', 'paypal', 'bank-transfer']).withMessage('Invalid payment method'),
  body('totalPrice').notEmpty().withMessage('Total price is required').isFloat({ min: 0 }).withMessage('Total price must be a positive number'),
];

module.exports = { checkoutValidation };