import { PublicLayout } from '../pages/layout/PublicLayout';
import { Home } from '../pages/public/Home';
import { About } from '../pages/public/About';
import { Services } from '../pages/public/Services';
import { Contact } from '../pages/public/Contact';
import { Tracking } from '../pages/public/Tracking';
import { Track } from '../pages/public/Track';



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
            {
                path: '/tracking',
                element: <Tracking />,
            },
            {
                path: '/tracking/:id',
                element: <Track />,
            },
            
        ],
    },
];
