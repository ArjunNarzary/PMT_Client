import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { removeUser } from "@/redux/slices/authUser"
import { useNavigate } from "react-router-dom"

interface ILayoutProps {
  children: React.ReactNode
}

const LayoutContainer = ({ children }: ILayoutProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userDetails = useSelector(
    (state: { authUser: { name: string } }) => state.authUser
  )

  const handleLogout = async () => {
    await dispatch(removeUser())
    navigate("/login", { replace: true })
  }

  return (
    <div className="flex flex-col min-h-screen w-full container mx-auto">
      <header className="flex flex-row justify-between items-center py-10">
        <h1 className="text-3xl font-extrabold">Project Management Tool</h1>
        <div className="flex flex-row gap-x-3 justify-end items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              {userDetails?.name || "User"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1">{children}</main>

      <footer className="flex justify-center py-4">
        All right reserver &copy; 2024
      </footer>
    </div>
  )
}

export default LayoutContainer
