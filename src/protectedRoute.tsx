import { Outlet } from 'react-router-dom';
import { authService } from './services/authService';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute() {
  const isAuthenticated = authService.isAuthenticated();
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}