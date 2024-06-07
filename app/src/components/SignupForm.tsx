import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axiosMain from "../services/axios"
import photo from '../assets/ecommerceSignup.png'

interface Form {
    username: string,
    email: string,
    fName: string,
    lName: string,
    pass: string,
    confirmPass: string
}

function SignupForm() {
    const [form, setForm] = useState<Form>({ username: '', email: '', fName: '', lName: '', pass: '', confirmPass: '' })
    const [errorText, setErrorText] = useState('')
    const [successText, setSuccessText] = useState('')
    const navigate = useNavigate()

    const submitHandel = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (form.username && form.email && form.fName && form.lName && form.pass === form.confirmPass) {
            axiosMain.post('/signup', { username: form.username.toLowerCase().trim(), email: form.email.toLowerCase().trim(), fName: form.fName.toLowerCase().trim(), lName: form.lName.toLowerCase().trim(), pass: form.pass.trim(), confirmPass: form.confirmPass.trim() })
                .then((e) => {
                    setSuccessText(e.data.message)
                    setErrorText('')
                    setForm({ username: '', email: '', fName: '', lName: '', pass: '', confirmPass: '' })
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                })
                .catch((err) => {
                    setErrorText(err.response.data.message)
                })
        } else {
            setErrorText('Your Password Not Match')
        }
    }
    return (
        <section className="bg-white m-7">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-64 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src={photo}
                        className="absolute inset-0 h-full w-full object-fill"
                    />
                </aside>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                            Welcome E-commerce
                        </h1>

                        {errorText && <h2 className="rounded border-s-4 border-red-500 bg-red-50 p-4">{errorText}</h2>}
                        {successText && <h2 className="rounded border-s-4 border-green-500 bg-green-50 p-4">{successText}</h2>}
                        <p className="mt-4 leading-relaxed text-gray-500">
                            By joining us, you'll access a world of convenience, variety, and quality. Enjoy personalized recommendations, secure payments, fast delivery, and exceptional customer service. Experience a new way of shopping where your satisfaction is our priority. Join us today and transform your shopping experience!
                        </p>

                        <form onSubmit={(e) => submitHandel(e)} className="mt-8 grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    id="FirstName"
                                    name="first_name"
                                    value={form.fName}
                                    onChange={(e) => setForm({ ...form, fName: e.target.value })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    id="LastName"
                                    name="last_name"
                                    value={form.lName}
                                    onChange={(e) => setForm({ ...form, lName: e.target.value })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

                                <input
                                    type="email"
                                    id="Email"
                                    name="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Username </label>

                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                                <input
                                    type="password"
                                    id="Password"
                                    name="password"
                                    value={form.pass}
                                    onChange={(e) => setForm({ ...form, pass: e.target.value })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                                    Password Confirmation
                                </label>

                                <input
                                    type="password"
                                    id="PasswordConfirmation"
                                    name="password_confirmation"
                                    value={form.confirmPass}
                                    onChange={(e) => setForm({ ...form, confirmPass: e.target.value })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                                />
                            </div>

                            <div className="col-span-6">
                                <p className="text-sm text-gray-500">
                                    By creating an account, you agree to our
                                    <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                                    and
                                    <a href="#" className="text-gray-700 underline">privacy policy</a>.
                                </p>
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                >
                                    Create an account
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Already have an account? <Link to={'/login'} className="text-gray-700 underline">Log in</Link>.
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default SignupForm