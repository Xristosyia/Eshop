import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/products/add', formData, {
        headers: {
          Authorization: `Bearer YOUR_ADMIN_TOKEN`, // Replace later dynamically
        }
      });
      navigate('/admin/products'); // Go back to products after adding
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ marginBottom: '1rem' }}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          style={{ marginBottom: '1rem' }}
        />
        <textarea
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ marginBottom: '1rem' }}
        />
        <input
          type="text"
          placeholder="Image URL"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          style={{ marginBottom: '1rem' }}
        />
        <input
          type="text"
          placeholder="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          style={{ marginBottom: '1rem' }}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
