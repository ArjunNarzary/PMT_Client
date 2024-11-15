import { Route, Routes } from "react-router-dom"
import { ProtectedRoute, PublicRoutes, PrivateRoutes } from "./routes"
import { IRouteConfig } from "./routes/RouteConfig"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addUser } from "./redux/slices/authUser"
import { Toaster } from "./components/ui/toaster"

function App() {
  const dispatch = useDispatch()
  const REDUXUSER = useSelector(
    (state: { AUTHUSER: { token: string } }) => state.AUTHUSER
  )
  const [isAuthenticated, setAuthenticated] = useState(
    REDUXUSER?.token ? true : false
  )

  useEffect(() => {
    if (!REDUXUSER.token) {
      const userDetail = localStorage.getItem("user")
      if (userDetail) {
        const user = JSON.parse(userDetail)
        dispatch(addUser(user))
        setAuthenticated(true)
      }
    }
    // eslint-disable-next-line
  }, [])

  const renderRoutes = (routes: IRouteConfig[]) => {
    return routes.map((route: IRouteConfig) => {
      const { path, component: Component } = route
      return <Route key={path} path={path} element={<Component />} />
    })
  }

  return (
    <>
      <Toaster />
      <Routes>
        <>
          {/* protected routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectTo="/login"
              />
            }
          >
            {renderRoutes(PrivateRoutes)}
          </Route>

          {/* public routes */}
          {renderRoutes(PublicRoutes)}
        </>
      </Routes>
    </>
  )
}

export default App
