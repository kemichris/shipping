import { Navigate, useRoutes } from 'react-router-dom';
import {publicRoutes} from './publicRoutes';
// import { adminRoutes } from './admin.routes';
// import { ProtectedRoute } from './ProtectedRoute';


export default function AppRoutes() {
    return useRoutes([
        ...publicRoutes,
        // {
        //     element: <ProtectedRoute allowedRoles={['user']} />,
        //     children: userRoutes,
        // },
        // {
        //     element: <ProtectedRoute allowedRoles={['admin']} />,
        //     children: adminRoutes,
        // },
        {
            path: '*',
            element: <Navigate to="/" replace />,
        },
    ]);
}