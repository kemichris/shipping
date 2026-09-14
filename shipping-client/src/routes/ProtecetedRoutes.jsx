import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const role = typeof window !== 'undefined' ? (localStorage.getItem('role')) : null;

    if (!token || role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
