import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

export default function ManageProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/products')
      .then(res => setProducts(res.data))
      .catch(console.error);
  }, []);

  const del = (id) => {
    if (!window.confirm('Delete?')) return;
    axios.delete(`/admin/products/delete/${id}`)
      .then(() => setProducts(p=>p.filter(x=>x._id!==id)))
      .catch(console.error);
  };

  return (
    <div style={{ padding:'2rem' }}>
      <h1>Manage Products</h1>
      <button onClick={()=>navigate('/AddProduct')}>Add Product</button>
      <ul>
        {products.map(p=>(
          <li key={p._id}>
            {p.name} - ${p.price}
            <button onClick={()=>navigate(`/EditProduct/${p._id}`)} style={{ marginLeft:'1rem' }}>
              Edit
            </button>
            <button onClick={()=>del(p._id)} style={{ marginLeft:'0.5rem' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
