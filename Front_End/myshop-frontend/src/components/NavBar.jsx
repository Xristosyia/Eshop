import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', background: '#eee', marginBottom: '2rem' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>

      {!token ? (
        <>
          <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
}

export default Navbar;
