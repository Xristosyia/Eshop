import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/login');
    } catch (error) {
      setErr(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ padding:'2rem' }}>
      <h1>Register</h1>
      {err && <p style={{ color:'red' }}>{err}</p>}
      <form onSubmit={submit}>
        <input type="text" placeholder="Name" name="name"
               value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/>
        <br/><br/>
        <input type="email" placeholder="Email" name="email"
               value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/>
        <br/><br/>
        <input type="password" placeholder="Password" name="password"
               value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required/>
        <br/><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
