import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './LogRegi.css'


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const { login: loginContext } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      loginContext(res.token, res.user);
      navigate('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      {err && <p className="form-error">{err}</p>}
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
