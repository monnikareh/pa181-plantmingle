import { Navigate, RouteObject } from 'react-router-dom';
import FrontPage from '../pages/FrontPage';
import ListPlantsPage from '../pages/ListPlantsPage';
import MainLayout from '../components/MainLayout';
import PlantsSwipePage from "../pages/PlantsSwipePage";
import MatchPage from "../pages/MatchPage.tsx";

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
    path: 'match',
    element: <MatchPage />,
  },
  {
    path: 'plants/:id',
    element: <ListPlantsPage />,
  },
  {
    path: 'swipe/:id',
    element: <PlantsSwipePage />,
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
