import { useEffect, useState } from 'react';
import axios from '../utils/axios';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/admin/orders')
      .then(res => setOrders(res.data))
      .catch(console.error);
  }, []);

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
          </div>
        ))
      )}
    </div>
  );
}
