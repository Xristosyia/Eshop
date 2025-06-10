import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './NavBar.css'

export default function NavBar() {
  const { token,user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
 

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav >
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/cart" className="nav-link">Cart</Link>
      {!token ? (
        <>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </>
      ) : (
        <>
          {user?.role === 'admin' && (
            <Link to="/admin" className="nav-link">Admin</Link>
          )}
          <button className="nav-button" onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}
