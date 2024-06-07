import { useLocation } from "react-router-dom"
import { ProductsType } from "../context/getProducts"
import { Link } from "react-router-dom"

function SelectedProduct({ item }: { item: ProductsType[] }) {
    const id = useLocation().pathname.split('/')[2]
    const oneItem = item?.filter((ele) => ele._id == id)[0]
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 shadow-xl">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    
                    <div className="relative w-[100%] md:w-[70%] h-[300px] overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                        <img
                            alt={oneItem?.title}
                            src={oneItem?.image}
                            className="absolute inset-0 h-full w-full object-fill"
                        />
                    </div>

                    <div className="lg:py-24">
                        <h2 className="text-3xl font-bold sm:text-4xl">{oneItem?.title}</h2>

                        <p className="mt-4 text-gray-600">
                            {oneItem?.body}
                        </p>

                        <Link
                            to="/"
                            className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                        >
                            Add To Cart
                        </Link>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default SelectedProduct