import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar'; // 
import Home from './pages/Home';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import ManageProducts from './pages/ManageProducts';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} /> 
        <Route path="/admin/products" element={<ManageProducts />} /> 
        <Route path="/admin/products/add" element={<AddProduct />} /> 
        <Route path="/admin/products/edit/:id" element={<EditProduct />} /> 
      </Routes>
    </>
  );
}

export default App;
