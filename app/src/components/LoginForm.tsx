import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axiosMain from "../services/axios"
import IsChange from "../context/isChange"
import photo from '../assets/e-commerceLogin.jpg'


function LoginForm() {
    const navigate = useNavigate()
    const [form, setForm] = useState<{ emailOrusername: string, pass: string }>({ emailOrusername: '', pass: '' })
    const [errorText, setErrorText] = useState('')
    const [successText, setSuccessText] = useState('')
    const context = useContext(IsChange)
    if (!context) {
        throw new Error('this must be only boolean value')
    }
    const { setIsChange } = context
    const submitHandel = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (form.emailOrusername && form.pass) {
            axiosMain.post('/login', { emailOrusername: form.emailOrusername.toLowerCase().trim(), pass: form.pass.trim() })
                .then((e) => {
                    localStorage.setItem('token', e.data.token)
                    setErrorText('')
                    setSuccessText('Welcome to E-Commerce Website')
                    setTimeout(() => {
                        navigate('/')
                        setIsChange(true)
                        setSuccessText('')
                    }, 2000)
                })
                .catch(() => {
                    setErrorText('Wrong Email Or Password')
                    setForm({ emailOrusername: '', pass: '' })
                })
        }
    }
    return (
        < section className="relative flex flex-wrap lg:h-screen lg:items-center m-7" >
            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-lg text-center">

                    {errorText && <h2 className="rounded border-s-4 border-red-500 bg-red-50 p-4">{errorText}</h2>}
                    {successText && <h2 className="rounded border-s-4 border-green-500 bg-green-50 p-4">{successText}</h2>}
                    <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

                    <p className="mt-4 text-gray-500">
                        Join us at E-Commerce and start your learning journey today!
                    </p>
                </div>
                <form onSubmit={(e) => { submitHandel(e) }} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative">
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter email or username"
                                maxLength={50}
                                required
                                value={form.emailOrusername}
                                onChange={(e) => setForm({ ...form, emailOrusername: e.target.value })}
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>

                        <div className="relative">
                            <input
                                type="password"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
                                maxLength={50}
                                required
                                value={form.pass}
                                onChange={(e) => setForm({ ...form, pass: e.target.value })}
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            No account? <Link className="underline" to="/signup">Sign up</Link>
                        </p>

                        <button
                            type="submit"
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>

            <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
                <img
                    alt=""
                    src={photo}
                    className="absolute inset-0 h-full w-full object-fill"
                />
            </div>
        </section >
    )
}

export default LoginForm