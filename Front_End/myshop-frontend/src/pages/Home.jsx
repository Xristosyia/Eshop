import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: '2rem' }}>
      <h1>Products</h1>
      <div style={{ display:'flex', flexWrap:'wrap', gap:'1rem' }}>
        {products.map(p => (
          <div key={p._id} style={{ border:'1px solid #ddd', padding:'1rem', width:'200px' }}>
            <img src={p.image} alt={p.name} style={{ width:'100%', height:'120px', objectFit:'cover' }} />
            <h3>{p.name}</h3>
            <p>${p.price.toFixed(2)}</p>
            <button onClick={() => addToCart(p._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
