import { useEffect, useState } from 'react';
import axios from '../utils/axios'; // 👈 use our customized axios
import { useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post('/cart/add', { productId, quantity: 1 });
      alert('Product added to cart!');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Not authenticated
        alert('Please login first!');
        navigate('/login');
      } else {
        console.error('Error adding to cart:', error);
      }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Products</h1>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          {products.map((product) => (
            <div key={product._id} style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <p>{product.category}</p>
              <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
