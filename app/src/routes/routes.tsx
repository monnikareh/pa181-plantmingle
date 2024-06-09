import { Navigate, RouteObject } from 'react-router-dom';
import FrontPage from '../pages/FrontPage';
import ListPlantsPage from '../pages/ListPlantsPage';
import MainLayout from '../components/MainLayout';

const mainLayoutRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="/home" />,
  },
  {
    path: 'home',
    element: <FrontPage />,
  },
  {
    path: 'plants',
    element: <ListPlantsPage />,
  },
];

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: mainLayoutRoutes,
  },
];

export default routes;
