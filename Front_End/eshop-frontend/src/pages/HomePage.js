import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);  // Cart state to store added products

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include token in headers
        },
        body: JSON.stringify({
          userId: "some-user-id", // Replace with actual user ID
          productId: product._id,
          quantity: 1,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
  
      alert(`${product.name} added to cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <Link to={`/product/${product._id}`}>
              <h2>{product.name}</h2>
            </Link>
            <img src={product.imageUrl} alt={product.name} width="200" />
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Stock: {product.stock}</p>
            <p>Description: {product.description}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button> {/* Add to Cart button */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;