import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

export default function DeleteProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => setError('Product not found'));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`/admin/products/delete/${id}`)
      .then(() => {
        alert('Product deleted');
        navigate('/ManageProduct');
      })
      .catch(err => setError('Deletion failed'));
  };

  const cancel = () => navigate('/ManageProduct');

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (!product) return <p>Loading product...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Delete Product</h1>
      <p>Are you sure you want to delete the following product?</p>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ width: '200px', height: '150px' }} />
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
      <br />
      <button onClick={handleDelete} style={{ marginRight: '1rem', backgroundColor: 'red', color: 'white' }}>
        Confirm Delete
      </button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}
