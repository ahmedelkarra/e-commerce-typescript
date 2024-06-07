import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"



function Admin() {
    const navigate = useNavigate()
    const location = window.location.pathname

    useEffect(() => {
        if (location == '/admin') {
            navigate('/admin/addproduct')
        }
    }, [location])
    return (
        <section className=" bg-gray-100 min-h-[600px]">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">

                <div className="grid grid-cols-3 md:grid-cols-2 bg-gray-200 rounded-lg mb-10 justify-center items-center">
                    <h2 className="p-2 text-center text-[18px] col-span-12">What do you need to do</h2>
                    <Link to={'/admin/addproduct'} className="bg-green-400 col-span-12 md:col-span-1 w-[200px] mx-auto p-2 my-3 text-center rounded-lg text-white">Add Product To Sell</Link>
                    <Link to={'/admin/editproducts'} className="bg-red-400 col-span-12 md:col-span-1 w-[200px] mx-auto p-2 my-3 text-center rounded-lg text-white">Edit Product</Link>
                </div>

                <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                    <div className="lg:col-span-2 lg:py-12">
                        <p className="max-w-xl text-lg">
                            Welcome to the E-commerce Admin Panel! Here, you can effortlessly manage products, Our intuitive tools and comprehensive analytics empower you to keep everything running smoothly. Dive in and make the most of your E-Commerce platform!
                        </p>

                    </div>
                    <Outlet />
                </div>
            </div>
        </section>
    )
}

export default Admin