import { FrontPage } from 'components/front/FrontPage.stories'
import { LoginPanel, RegisterPanel } from 'components/login'
import { Users } from 'components/users'
import { createBrowserRouter } from 'react-router-dom'

export const Routes = {
  root: '/',
  auth: '/auth',
  login: '/auth/login',
  users: '/users',
} as const

export const router = createBrowserRouter([
  {
    path: Routes.root,
    element: <FrontPage />,
  },
  {
    path: Routes.auth,
    element: <RegisterPanel />,
  },
  {
    path: Routes.login,
    element: <LoginPanel />,
  },
  {
    path: Routes.users,
    element: <Users />,
  },
])
