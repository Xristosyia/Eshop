import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ margin: '1rem 0' }}>
          <Link to="/admin/products">Manage Products</Link>
        </li>
        <li style={{ margin: '1rem 0' }}>
          <Link to="/admin/orders">Manage Orders</Link>
        </li>
        {/* Later you can add User Management here */}
      </ul>
    </div>
  );
}

export default AdminDashboard;
