import { useContext } from "react"
import IsChange from "../context/isChange"

function Logout() {
    const context = useContext(IsChange)
    if (!context) {
        throw new Error('this must be only boolean value')
    }

    const { setIsChange } = context

    const clickHandle = () => {
        localStorage.removeItem('token')
        setIsChange(true)
    }
    return (
        <button className="md:text-gray-500 md:transition md:bg-white md:hover:text-gray-500/75 bg-gray-100 w-[100%] p-2" onClick={clickHandle}>Logout</button>
    )
}

export default Logout