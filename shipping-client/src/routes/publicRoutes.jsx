import { PublicLayout } from '../pages/layout/PublicLayout';

import { Home } from '../pages/public/Home';


export const publicRoutes = [
    // {
    //     path: '/login',
    //     element: <Login />,
    // },
    {
        element: <PublicLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            
        ],
    },
];
