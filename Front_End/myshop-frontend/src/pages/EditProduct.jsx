import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditProduct() {
  const { id } = useParams();  // Get product ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  useEffect(() => {
    // Fetch product details from the API when the component mounts
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/admin/products/${id}`);
        setFormData({
          name: response.data.name,
          price: response.data.price,
          description: response.data.description,
          image: response.data.image,
          category: response.data.category,
        });
      } catch (error) {
        console.error('Error fetching product:', error.response?.data || error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/admin/products/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer YOUR_ADMIN_TOKEN`,  // Replace later dynamically
        },
      });
      navigate('/admin/products'); // Redirect to products list
    } catch (error) {
      console.error('Error updating product:', error.response?.data || error.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Edit Product</h1>
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
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
