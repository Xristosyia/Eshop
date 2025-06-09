import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import './ManageOrders.css'


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
    <div className="manage-orders">
      <h1>All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
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
            <button onClick={() => handleDelete(order._id)}>
              Delete Order
            </button>
          </div>
        ))
      )}
    </div>
  );
}
