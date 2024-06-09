import { Navigate, RouteObject } from 'react-router-dom';
import FrontPage from '../pages/FrontPage';
import ListPlantsPage from '../pages/ListPlantsPage';
import MainLayout from '../components/MainLayout';
import PlantsSwipePage from "../pages/PlantsSwipePage";

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
  {
    path: 'swipe',
    element: <PlantsSwipePage />,
  },
  {
    path: 'plants/:id',
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
