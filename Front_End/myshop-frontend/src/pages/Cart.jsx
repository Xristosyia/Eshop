import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get('/cart');
      setCart(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Please login to view your cart');
        navigate('/login');
      } else {
        console.error('Error fetching cart:', error);
      }
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete('/cart/remove', { data: { productId } });
      fetchCart(); // Refresh cart
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post('/checkout', { address: "Dummy Address" }); // address optional if your backend doesn't need it
      alert('Order placed successfully!');
      navigate('/'); // back to Home
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.items.map((item) => (
            <div key={item.productId._id} style={{ marginBottom: '1rem' }}>
              <strong>{item.productId.name}</strong> - {item.quantity} x ${item.price}
              <button style={{ marginLeft: '1rem' }} onClick={() => handleRemoveItem(item.productId._id)}>Remove</button>
            </div>
          ))}
          <h2>Total: ${cart.totalPrice}</h2>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
