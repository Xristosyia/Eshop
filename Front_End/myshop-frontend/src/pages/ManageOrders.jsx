import { useEffect, useState } from 'react';
import axios from '../utils/axios';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/admin/orders')
      .then(res => setOrders(res.data))
      .catch(console.error);
  }, []);

const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;

    try {
      await axios.delete(`/admin/orders/delete/${id}`);
      setOrders(prev => prev.filter(order => order._id !== id));
      alert('Order deleted successfully.');
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div
            key={order._id}
            style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}
          >
            <h3>Order ID: {order._id}</h3>
            <p><strong>User:</strong> {order.user?.name || 'N/A'} ({order.user?.email})</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>

            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.product?.name || 'Unknown Product'} x{item.quantity} – ${item.price}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleDelete(order._id)}
              style={{
                marginTop: '0.5rem',
                background: 'red',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Delete Order
            </button>
          </div>
        ))
      )}
    </div>
  );
}
