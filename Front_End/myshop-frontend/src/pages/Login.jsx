import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await authService.login(email, password);
      navigate('/'); // Go to homepage after login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ marginTop: '1rem' }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
