import {Navigate, RouteObject} from "react-router-dom";
import FrontPage from '../pages/FrontPage';
import MainLayout from '../components/MainLayout';

const mainLayoutRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="/home" relative="path" />,
  },
  {
    path: '/home',
    Component: FrontPage,
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
