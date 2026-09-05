import { PublicLayout } from '../pages/layout/PublicLayout';
import { Home } from '../pages/public/Home';
import { About } from '../pages/public/About';


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
            {
                path: '/about',
                element: <About />,
            },
            
        ],
    },
];
