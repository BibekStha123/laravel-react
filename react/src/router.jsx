import { createBrowserRouter } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import User from './views/User';
import PageNotFound from './views/PageNotFound';
import DefaultLayout from './views/components/DefaultLayout';
import GuestLayout from './views/components/GuestLayout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <User />
            },
            {
                path: '/user',
                element: <User />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    },
    {
        path: '*',
        element: <PageNotFound />
    }
])

export default router;