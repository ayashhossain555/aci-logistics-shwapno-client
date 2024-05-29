import ProtectedRoute from '../src/components/ProtectedRoute';
import { useAuth } from '../src/contexts/AuthContext';

const Admin = () => {
  const { logout } = useAuth();

  return (
    <ProtectedRoute>
      <div>
        <h1>Admin Panel</h1>
        <button onClick={logout}>Logout</button>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
