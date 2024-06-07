import { Link } from "react-router-dom"
import { UserType } from "../context/getUser"

function Profile({ user }: { user: UserType }) {

    return (
        <Link to={'/profile'} className="flex justify-center items-center border border-gray-800 bg-gray-600 text-white w-8 h-8 rounded-full" >{user.fName.split('')[0].toUpperCase()}</Link>
    )
}

export default Profile