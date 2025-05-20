import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/cart')
      .then(res => setCart(res.data))
      .catch(err => {
        if (err.response?.status===401) navigate('/login');
      });
  }, [navigate]);

  const remove = (id) => {
    axios.delete('/cart/remove', { data:{ productId:id } })
      .then(() => setCart(c=>({
        items: c.items.filter(i=>i.productId._id!==id),
        totalPrice: c.items.filter(i=>i.productId._id!==id)
                     .reduce((sum,i)=>sum+i.price*i.quantity,0)
      })))
      .catch(console.error);
  };

  const updateQuantity = (id, quantity) => {
    axios.put('/cart/update', { productId: id, quantity })
      .then(res => setCart(res.data))
      .catch(console.error);
  };

  const checkout = () => {
    axios.post('/orders/checkout', {
      totalPrice: cart.totalPrice
    })
      .then(() => {
        alert('Order placed');
        navigate('/');
      })
      .catch(console.error);
  };

  return (
    <div style={{ padding:'2rem' }}>
      <h1>Your Cart</h1>
      {cart.items.length===0
        ? <p>Cart is empty</p>
        : <div>
            {cart.items.map(i=>(
              <div key={`${i.productId._id}-${i.quantity}`} style={{ marginBottom:'1rem' }}>
                <strong>{i.productId.name}</strong> x{i.quantity} = ${i.price*i.quantity}
                <button onClick={() => updateQuantity(i.productId._id, i.quantity - 1)} style={{ marginLeft: '1rem' }}>
                  −
                </button>
                <button onClick={() => updateQuantity(i.productId._id, i.quantity + 1)} style={{ marginLeft: '0.5rem' }}>
                  +
                </button>
                <button onClick={()=>remove(i.productId._id)} style={{ marginLeft:'1rem' }}>
                  Remove
                </button>
              </div>
            ))}
            <h2>Total: ${cart.totalPrice.toFixed(2)}</h2>
            <button onClick={checkout}>Checkout</button>
          </div>
      }
    </div>
  );
}
