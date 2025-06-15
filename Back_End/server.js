require('dotenv').config(); 
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');


const productRoutes = require('./routes/productRoutes');  
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminProductRoutes = require('./routes/adminProductRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');

const app = express();

app.use(express.json()); 
app.use(cors()); 

connectDB();

// Routes
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin/products', adminProductRoutes);
app.use('/api/admin/orders', adminOrderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});