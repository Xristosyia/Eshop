import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AdminDashBoard from './pages/AdminDashboard';
import ManageProduct from './pages/ManageProduct';
import ManageOrders from './pages/ManageOrders'
import AddProduct from './pages/AddProduct'; 
import EditProduct from './pages/EditProduct';
import DeleteProduct from './pages/DeleteProduct'
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute role="admin"><AdminDashBoard /></PrivateRoute>} />
        <Route path="/ManageProduct" element={<PrivateRoute role="admin"><ManageProduct /></PrivateRoute>} />
        <Route path="/ManageOrders" element={<PrivateRoute role="admin"><ManageOrders /></PrivateRoute>} />
        <Route path="/AddProduct" element={<PrivateRoute role="admin"><AddProduct /></PrivateRoute>} />
        <Route path="/EditProduct/:id" element={<PrivateRoute role="admin"><EditProduct /></PrivateRoute>} />
        <Route path="/DeleteProduct/:id" element={<PrivateRoute role="admin"><DeleteProduct /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
