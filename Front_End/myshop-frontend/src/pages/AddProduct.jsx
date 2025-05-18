import { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [form, setForm] = useState({
    name:'', price:'', description:'', image:'', category:''
  });
  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();
    axios.post('/admin/products/add', form)
      .then(()=>navigate('/ManageProduct'))
      .catch(console.error);
  };

  return (
    <div style={{ padding:'2rem' }}>
      <h1>Add Product</h1>
      <form onSubmit={submit}>
        {['name','price','description','image','category'].map(key=>(
          <div key={key} style={{ marginBottom:'1rem' }}>
            <label>{key}: </label>
            <input
              name={key}
              type={key==='price'?'number':'text'}
              value={form[key]}
              onChange={e=>setForm({...form,[key]:e.target.value})}
              required
            />
          </div>
        ))}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
