import { PublicLayout } from '../pages/layout/PublicLayout';
import { Home } from '../pages/public/Home';
import { About } from '../pages/public/About';
import { Services } from '../pages/public/Services';
import { Contact } from '../pages/public/Contact';



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
            {
                path: '/services',
                element: <Services />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            
        ],
    },
];
