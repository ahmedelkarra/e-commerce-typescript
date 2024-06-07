import { useContext, useState } from "react"
import axiosMain from "../services/axios"
import IsChange from "../context/isChange"


export interface UserForm {
    _id: string,
    username: string,
    email: string,
    fName: string,
    lName: string,
    pass?: string,
    newPass?: string,
    newPassConfirm?: string,
}

function ProfileEdit({ user }: { user: UserForm }) {
    const [form, setForm] = useState<UserForm>({ _id: user?._id, fName: user?.fName, lName: user?.lName, username: user?.username, email: user?.email, pass: '', newPass: '', newPassConfirm: '' })
    const [errorText, setErrorText] = useState('')
    const [successText, setSuccessText] = useState('')
    const context = useContext(IsChange)
    if (!context) {
        throw new Error('this must be only boolean value')
    }

    const { setIsChange } = context

    const fromHandel = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (form.fName && form.lName && form.username && form.email && form.pass && form?.newPass === form?.newPassConfirm) {
            axiosMain.put(`/user/${user._id}`, form)
                .then((e) => {
                    console.log(e.data)
                    setSuccessText(e.data.message)
                    setErrorText('')
                    setIsChange(true)
                    setTimeout(() => {
                        setSuccessText('')
                    }, 1500)
                })
                .catch((err) => {
                    console.log(err)
                    setSuccessText('')
                    setErrorText(err.response.data.message)
                })
        } else {
            setErrorText('Please Check All Inputs')
        }
    }
    return (
        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            {errorText && <h2 className="rounded border-s-4 border-red-500 bg-red-50 p-4 mb-2">{errorText}</h2>}
            {successText && <h2 className="rounded border-s-4 border-green-500 bg-green-50 p-4 mb-2">{successText}</h2>}
            <form onSubmit={(e) => fromHandel(e)} className="space-y-4">

                <div className="grid grid-cols-12 justify-center items-center">
                    <label className="col-span-12 md:col-span-3" htmlFor="Title">First Name</label>
                    <input
                        className="col-span-12 md:col-span-9 w-full rounded-lg border border-gray-200 p-3 text-sm"
                        placeholder="First Name"
                        type="text"
                        id="fName"
                        onChange={(e) => setForm({ ...form, fName: e.target.value })}
                        value={form.fName}
                    />
                </div>

                <div className="grid grid-cols-12 justify-center items-center">
                    <label className="col-span-12 md:col-span-3" htmlFor="Title">Last Name</label>
                    <input
                        className="col-span-12 md:col-span-9 w-full rounded-lg border border-gray-200 p-3 text-sm"
                        placeholder="Last Name"
                        type="text"
                        id="lName"
                        onChange={(e) => setForm({ ...form, lName: e.target.value })}
                        value={form.lName}
                    />
                </div>

                <div className="grid grid-cols-12 justify-center items-center">
                    <label className="col-span-12 md:col-span-3" htmlFor="Title">Username</label>
                    <input
                        className="col-span-12 md:col-span-9 w-full rounded-lg border border-gray-200 p-3 text-sm"
                        placeholder="Username"
                        type="text"
                        id="username"
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        value={form.username}
                    />
                </div>

                <div className="grid grid-cols-12 justify-center items-center">
                    <label className="col-span-12 md:col-span-3" htmlFor="Title">Email</label>
                    <input
                        className="col-span-12 md:col-span-9 w-full rounded-lg border border-gray-200 p-3 text-sm"
                        placeholder="Email"
                        type="text"
                        id="email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        value={form.email}
                    />
                </div>

                <div className="grid grid-cols-12 justify-center items-center">
                    <label className="col-span-12 md:col-span-3" htmlFor="Title">Old Password</label>
                    <input
                        className="col-span-12 md:col-span-9 w-full rounded-lg border border-gray-200 p-3 text-sm"
                        placeholder="Old Password"
                        type="password"
                        id="pass"
                        onChange={(e) => setForm({ ...form, pass: e.target.value })}
                        value={form.pass}
                    />
                </div>

                <div className="grid grid-cols-12 justify-center items-center">
                    <label className="col-span-12 md:col-span-3" htmlFor="Title">New Password</label>
                    <input
                        className="col-span-12 md:col-span-9 w-full rounded-lg border border-gray-200 p-3 text-sm"
                        placeholder="New Password"
                        type="password"
                        id="newPass"
                        onChange={(e) => setForm({ ...form, newPass: e.target.value })}
                        value={form.newPass}
                    />
                </div>

                <div className="grid grid-cols-12 justify-center items-center">
                    <label className="col-span-12 md:col-span-3" htmlFor="Title">Confirm New Password</label>
                    <input
                        className="col-span-12 md:col-span-9 w-full rounded-lg border border-gray-200 p-3 text-sm"
                        placeholder="Confirm New Password"
                        type="password"
                        id="newPassConfirm"
                        onChange={(e) => setForm({ ...form, newPassConfirm: e.target.value })}
                        value={form.newPassConfirm}
                    />
                </div>

                <div className="mt-4 grid grid-cols-12 justify-center items-center">
                    <button
                        type="submit"
                        className="col-span-12 rounded-lg bg-buttonColor px-5 py-3 font-medium text-buttonText sm:w-auto"
                    >
                        Edit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProfileEdit