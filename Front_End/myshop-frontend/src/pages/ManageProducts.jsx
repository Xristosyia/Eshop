import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/admin/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/admin/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer YOUR_ADMIN_TOKEN`,  // Replace dynamically
        },
      });
      setProducts(products.filter((product) => product._id !== id));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error.response?.data || error.message);
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Manage Products</h1>
      <Link to="/admin/products/add" style={{ marginBottom: '1rem', display: 'inline-block' }}>
        <button>Add New Product</button>
      </Link>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <div key={product._id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd' }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>

            <div>
              {/* Link to Edit Product */}
              <Link to={`/admin/products/edit/${product._id}`} style={{ marginRight: '1rem' }}>
                Edit
              </Link>

              {/* Delete Product */}
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ManageProducts;
