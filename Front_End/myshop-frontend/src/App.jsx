import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AdminDashBoard from './pages/AdminDashboard';
import ManageProduct from './pages/ManageProduct';
import AddProduct from './pages/AddProduct'; 
import EditProduct from './pages/EditProduct';
import DeleteProduct from './pages/DeleteProduct'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="/ManageProduct" element={<ManageProduct />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/EditProduct/:id" element={<EditProduct />} />
        <Route path="/DeleteProduct/:id" element={<DeleteProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
