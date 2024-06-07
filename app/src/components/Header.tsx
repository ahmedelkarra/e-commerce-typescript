import { useContext } from "react"
import { Link } from "react-router-dom"
import GetUser from "../context/getUser"
import Logout from "./Logout";
import logo from '../assets/logo.svg'
import Cart from "./CartMain";
import Profile from "./Profile";
import DropdownButton from "./DropdownButton";

function Header() {
    const context = useContext(GetUser)
    if (!context) {
        throw new Error("GetUser.Provider from Header Page");
    }
    const { userInfo } = context
    return (
        <header className="bg-white sticky top-0 z-50">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <Link className="block text-teal-600" to="/">
                            <span className="sr-only">Home</span>
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" to="/"> Home </Link>
                                </li>

                                <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" to="/about"> About </Link>
                                </li>

                                {userInfo?.isAdmin && <li>
                                    <Link className="transition hover:text-gray-200/75 bg-green-700 p-2 rounded-md text-white" to="/admin"> Admin </Link>
                                </li>}
                                {userInfo?.email && <li>
                                    <Logout />
                                </li>}

                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        {!userInfo?.email &&
                            <div className="sm:flex sm:gap-4">
                                <Link className="rounded-md bg-buttonColor px-5 py-2.5 text-sm font-medium text-white shadow" to="/login"> Login </Link>
                                <div className="hidden sm:flex">
                                    <Link className="rounded-md bg-blue-200 px-5 py-2.5 text-sm font-medium text-buttonText" to="/signup"> Signup </Link>
                                </div>
                            </div>}
                        {userInfo?.email && <div className="flex gap-4 justify-center items-center">
                            <Cart />
                            <Profile user={userInfo} />
                        </div>}
                        <div className="block md:hidden">
                            <DropdownButton />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header