const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true } // Store price at the time of adding to cart
    }
  ],
  totalPrice: { type: Number, required: true, default: 0 } // Total price of all items in cart
});

// Function to update total price before saving
cartSchema.pre('save', function (next) {
  this.totalPrice = this.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
