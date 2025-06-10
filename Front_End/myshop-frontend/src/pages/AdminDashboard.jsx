import { Link } from 'react-router-dom';
import './AdminDashboard.css'

export default function AdminDashBoard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/ManageProduct">Manage Products</Link></li>
        <li><Link to="/ManageOrders">Manage Orders</Link></li>
      </ul>
    </div>
  );
}
