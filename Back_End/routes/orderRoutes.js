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


    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Check if the cart has expired
    if (cart.expiresAt && new Date() > cart.expiresAt) {
      await Cart.deleteOne({ userId: req.user.id });
      return res.status(400).json({ message: 'Cart has expired' });
    }

    // Create an order from the cart
    const order = new Order({
      user: req.user.id,  // or req.user._id if that's what you set in protect middleware
      items: cart.items.map(item => ({
        product: item.productId._id,   // ⬅ fix here: extract _id from populated product
        quantity: item.quantity,
        price: item.price
      })),
      totalPrice: cart.totalPrice
    });

    await order.save();

    // Clear the cart after checkout
    await Cart.deleteOne({ user: req.user._id });

    res.status(200).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Checkout Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;