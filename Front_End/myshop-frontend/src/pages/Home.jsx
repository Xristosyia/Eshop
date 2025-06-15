import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/products')
      .then(res => setProducts(res.data))
      .catch(console.error);
  }, []);

  const addToCart = (id) => {
    axios.post('/cart/add', { productId: id, quantity: 1 })
      .then(() => alert('Added to cart'))
      .catch(err => {
        if (err.response?.status === 401) navigate('/login');
        else console.error(err);
      });
  };

  return (
    <div className="home-container">
  <h1>Products</h1>
  <div className="product-grid">
    {products.map(p => (
      <div key={p._id} className="product-card">
        <img src={p.image} alt={p.name} className="product-image" />
        <h3>{p.name}</h3>
        <p>${p.price.toFixed(2)}</p>
        <p>Description:  {p.description}</p>
        <button onClick={() => addToCart(p._id)}>Add to Cart</button>
      </div>
    ))}
  </div>
</div>

  );
}
