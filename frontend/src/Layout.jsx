import {Outlet} from "react-router"
import { Sidebar } from "./components/Sidebar"

export const Layout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <Outlet />
        </div>
    )
}