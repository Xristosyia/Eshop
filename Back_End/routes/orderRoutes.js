const express = require('express');
const { checkoutValidation } = require('../validators/orderValidators');
const { validationResult } = require('express-validator');
const { protect,protectAdmin } = require('../middleware/authMiddleware');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const router = express.Router();

// POST /checkout - Create an order from the cart
router.post('/checkout', protect, checkoutValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Check if the cart has expired
    if (new Date() > cart.expiresAt) {
      // If the cart expired, delete and inform the user
      await Cart.deleteOne({ user: req.user._id });
      return res.status(400).json({ message: 'Cart has expired' });
    }

    // Create an order from the cart
    const order = new Order({
      user: req.user._id,
      items: cart.items,
      totalPrice: cart.totalPrice,
    });

    await order.save();

    // Clear the cart after checkout
    await Cart.deleteOne({ user: req.user._id });

    res.status(200).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;