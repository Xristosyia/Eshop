const express = require('express');
const { productValidation } = require('../validators/productValidators');
const { validationResult } = require('express-validator');
const { protectAdmin } = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const router = express.Router();

// Add a new product
router.post('/add', protectAdmin, productValidation, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  const { name, price, description, image, category } = req.body;

  try {
    const product = new Product({
      name,
      price,
      description,
      image,
      category,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product
router.put('/update/:id', protectAdmin, async (req, res) => {
  const { name, price, description, image, category } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.category = category || product.category;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a product
router.delete('/delete/:id', protectAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.remove();
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;