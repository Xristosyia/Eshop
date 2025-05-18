import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

export default function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

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
