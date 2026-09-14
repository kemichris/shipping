import { Navigate, useRoutes } from 'react-router-dom';
import {publicRoutes} from './publicRoutes';
import { adminRoutes } from './adminRoutes';
import { ProtectedRoute } from './ProtecetedRoutes';


export default function AppRoutes() {
    return useRoutes([
        ...publicRoutes,
        {
            element: <ProtectedRoute allowedRoles={['admin']} />,
            children: adminRoutes,
        },
        {
            path: '*',
            element: <Navigate to="/" replace />,
        },
    ]);
}