import React, { useEffect, useState } from "react";

const CartPage = ({ userId }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });
      if (!response.ok) throw new Error("Failed to fetch cart");
      const data = await response.json();
      setCart(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const updateQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity === 0) {
        await removeItemFromCart(productId);
        return;
      }

      const response = await fetch("http://localhost:5000/api/cart/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity: newQuantity }),
      });

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItemFromCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cart || cart.items.length === 0) return <div>Your cart is empty.</div>;

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.productId}>
            <h3>{item.name}</h3>
            <img src={item.imageUrl} alt={item.name} width="100" />
            <p>Price: ${item.price}</p>
            <p>Total: ${item.price * item.quantity}</p>
            <div>
              <button 
                onClick={() => updateQuantity(item.productId, item.quantity - 1)} 
                disabled={item.quantity === 1} // Disable "-" if quantity is 1
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
              <button onClick={() => removeItemFromCart(item.productId)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total Price: ${cart.totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default CartPage;
