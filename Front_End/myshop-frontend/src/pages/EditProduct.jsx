import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProduct() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name:'', price:'', description:'', image:'', category:''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/products/${id}`)
    .then(res => {
      const { name = '', price = '', description = '', image = '', category = '' } = res.data;
      setForm({ name, price, description, image, category });
    })
      .catch(console.error);
  }, [id]);

  const submit = e => {
    e.preventDefault();
    axios.put(`/admin/products/update/${id}`, form)
      .then(()=>navigate('/ManageProduct'))
      .catch(console.error);
  };

  return (
    <div style={{ padding:'2rem' }}>
      <h1>Edit Product</h1>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
