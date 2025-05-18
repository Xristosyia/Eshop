import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ padding:'2rem' }}>
      <h1>Login</h1>
      {err && <p style={{ color:'red' }}>{err}</p>}
      <form onSubmit={submit}>
        <input type="email" placeholder="Email"
               value={email} onChange={e=>setEmail(e.target.value)} required/>
        <br/><br/>
        <input type="password" placeholder="Password"
               value={password} onChange={e=>setPassword(e.target.value)} required/>
        <br/><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
