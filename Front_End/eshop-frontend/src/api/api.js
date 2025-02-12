import axios from "axios";

const API_URL = "http://localhost:5000"; // Backend URL

const api = axios.create({
  baseURL: API_URL,
});

export const fetchProducts = () => api.get("/api/products");
export const fetchCart = () => api.get("/api/cart");
export const addToCart = (productId, quantity) =>
  api.post("/api/cart/add", { productId, quantity });
export const checkoutCart = (orderData) =>
  api.post("/api/orders/checkout", orderData);