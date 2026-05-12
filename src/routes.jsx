import { createBrowserRouter } from 'react-router';
import { LandingPage } from './pages/LandingPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProductsPage } from './pages/ProductsPage';
import { QuotePage } from './pages/QuotePage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminQuotesPage } from './pages/admin/AdminQuotesPage';
import { AdminEmployeesPage } from './pages/admin/AdminEmployeesPage';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { ErrorPage } from './pages/ErrorPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/projetos', element: <ProjectsPage /> },
      { path: '/produtos', element: <ProductsPage /> },
      { path: '/orcamento', element: <QuotePage /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/esqueci-senha',
    element: <ForgotPasswordPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/redefinir-senha',
    element: <ForgotPasswordPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'projetos', element: <AdminProjectsPage /> },
      { path: 'produtos', element: <AdminProductsPage /> },
      { path: 'orcamentos', element: <AdminQuotesPage /> },
      { path: 'funcionarios', element: <AdminEmployeesPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
