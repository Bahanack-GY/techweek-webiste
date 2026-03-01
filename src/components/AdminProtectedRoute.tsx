import { Navigate, Outlet } from 'react-router-dom';

export default function AdminProtectedRoute() {
  const token = localStorage.getItem('arety_techweek_token');

  if (!token) {
    return <Navigate to="/arety/admin/login" replace />;
  }

  return <Outlet />;
}
