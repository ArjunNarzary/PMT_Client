import { Home, LoginContainer, RegisterContainer } from "@/containers"
import { AppPath } from "./RouteName"
import TaskContainer from "@/containers/task"

export interface IRouteConfig {
  path: string
  component: () => JSX.Element
}

const PrivateRoutes: IRouteConfig[] = [
  {
    path: AppPath.base,
    component: Home,
  },
  {
    path: AppPath.task,
    component: TaskContainer,
  },
]

const PublicRoutes: IRouteConfig[] = [
  {
    path: AppPath.login,
    component: LoginContainer,
  },
  {
    path: AppPath.register,
    component: RegisterContainer,
  },
]

export { PrivateRoutes, PublicRoutes }
