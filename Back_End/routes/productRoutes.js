const express = require('express');
const { productValidation } = require('../validators/productValidators');
const { validationResult } = require('express-validator');
const Product = require('../models/Product');
const router = express.Router();
const { protectAdmin } = require('../middleware/authMiddleware');



// **READ all Products**
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// **READ Single Product by ID**
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;