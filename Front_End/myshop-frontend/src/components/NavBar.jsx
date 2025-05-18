import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function NavBar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
 

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', background: '#f5f5f5' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/cart" style={{ marginRight: '1rem' }}>Cart</Link>
      {!token ? (
        <>
          <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/admin" style={{ marginRight: '1rem' }}>Admin</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}
