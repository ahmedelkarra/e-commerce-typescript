import { Link } from "react-router-dom"
import GetUser from "../context/getUser";
import { useContext, useState } from "react";
import Logout from "./Logout";

function DropdownButton() {
    const [showUp, setShowUp] = useState<boolean>(false)
    const context = useContext(GetUser)
    if (!context) {
        throw new Error("GetUser.Provider from Header Page");
    }
    const { userInfo } = context
    return (

        <div className="relative">
            <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">

                <button
                    className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                    onClick={() => setShowUp(!showUp)}
                >
                    <span className="sr-only">Menu</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {showUp && <div
                className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg">
                <div className="p-2">
                    <nav aria-label="Global" className="flex flex-col items-center gap-6 text-sm">
                        <Link className="text-gray-500 w-[100%] bg-gray-100 p-2 transition hover:text-gray-500/75 rounded-md" to="/"> Home </Link>
                        {!userInfo?.email && <Link className="text-gray-500 w-[100%] bg-gray-100 p-2 transition hover:text-gray-500/75 rounded-md" to="/signup"> Register </Link>}
                        <Link className="text-gray-500 w-[100%] bg-gray-100 p-2 transition hover:text-gray-500/75 rounded-md" to="/about"> About </Link>
                        {userInfo?.isAdmin && <Link className="bg-green-700 w-[100%] p-2 transition hover:text-gray-200/75 rounded-md text-white" to="/admin"> Admin </Link>
                        }

                        {userInfo?.email && <Logout />
                        }
                    </nav>
                </div>
            </div>}
        </div>

    )
}

export default DropdownButton