import { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { Navigate , useRoutes, useNavigate  } from 'react-router-dom';
// layouts
// import DashboardLayout from './layouts/dashboard';
// import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import UniversityPage from './pages/UniversityPage';
import DashboardAppPage from './pages/DashboardAppPage';
import SimpleLayout from './layouts/simple';
import DashboardLayout from './layouts/dashboard';

// ----------------------------------------------------------------------

export default function Router() {
  const { instance, accounts } = useMsal();

  const navigate = useNavigate();

  useEffect(() => {
    if (accounts.length === 0) {
      navigate('/login');
    }
  },[]);

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'university', element: <UniversityPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

