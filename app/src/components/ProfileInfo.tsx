import { useState } from "react"
import { UserType } from "../context/getUser"

function ProfileInfo({ user }: { user: UserType }) {
    const [form] = useState<UserType>({ _id: user?._id, fName: user?.fName, lName: user?.lName, username: user.username, email: user?.email, isAdmin: user?.isAdmin })

    return (
        <div className="grid gap-4 rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <div className="grid grid-cols-12 justify-center items-center">
                <label className="col-span-12 md:col-span-3" htmlFor="Title">First Name</label>
                <input
                    className="col-span-12 md:col-span-9 w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="First Name"
                    type="text"
                    id="fName"
                    value={form.fName}
                    readOnly
                    disabled
                />
            </div>

            <div className="grid grid-cols-12 justify-center items-center">
                <label className="col-span-12 md:col-span-3" htmlFor="Title">Last Name</label>
                <input
                    className="col-span-12 md:col-span-9 w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="Last Name"
                    type="text"
                    id="lName"
                    value={form.lName}
                    readOnly
                    disabled
                />
            </div>

            <div className="grid grid-cols-12 justify-center items-center">
                <label className="col-span-12 md:col-span-3" htmlFor="Title">Username</label>
                <input
                    className="col-span-12 md:col-span-9 w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="Username"
                    type="text"
                    id="username"
                    value={form.username}
                    readOnly
                    disabled
                />
            </div>

            <div className="grid grid-cols-12 justify-center items-center">
                <label className="col-span-12 md:col-span-3" htmlFor="Title">Email</label>
                <input
                    className="col-span-12 md:col-span-9 w-full rounded-lg border border-gray-200 p-3 text-sm"
                    placeholder="Email"
                    type="text"
                    id="email"
                    value={form.email}
                    readOnly
                    disabled
                />
            </div>
        </div>
    )
}

export default ProfileInfo