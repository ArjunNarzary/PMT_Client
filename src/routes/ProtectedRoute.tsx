import LayoutContainer from "@/components/layout"
import { Navigate, Outlet } from "react-router-dom"

interface IProtectedRouteProps {
  isAuthenticated: boolean
  redirectTo: string
}
const ProtectedRoute = ({
  isAuthenticated,
  redirectTo,
}: IProtectedRouteProps) => {
  if (isAuthenticated) {
    return (
      <LayoutContainer>
        <Outlet />
      </LayoutContainer>
    )
  }
  return <Navigate to={redirectTo} replace />
}

export default ProtectedRoute
