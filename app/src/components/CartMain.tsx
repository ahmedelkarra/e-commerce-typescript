import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import CartContext from "../context/cartContext"

function Cart() {
    const [active, setIsActive] = useState(false)
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('this must be as ProductsType')
    }
    const { cart } = context
    return (
        <div className="relative">
            <FontAwesomeIcon icon={faCartArrowDown} className="p-2 w-7 h-7 border text-gray-600 border-gray-400 rounded-lg " onClick={() => active ? setIsActive(false) : setIsActive(true)} />
            {active && <div
                className="absolute top-16 right-0 w-[65dvw] max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
                aria-modal="true"
                role="dialog"
                tabIndex={-1}
            >
                <button className="absolute end-4 top-4 text-gray-600 transition hover:scale-110">
                    <span className="sr-only">Close cart</span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5"
                        onClick={() => setIsActive(false)}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="mt-4 space-y-6">
                    <ul className="space-y-4">

                        {cart?.map((item, index) => {
                            return (
                                <li className="flex items-center gap-4" key={index}>
                                    <img
                                        src={item?.image}
                                        alt={item?.title}
                                        className="size-16 rounded object-fill"
                                    />

                                    <div>
                                        <h3 className="text-sm text-gray-900">{item?.title}</h3>

                                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                            <div>
                                                <dt className="inline">Category: </dt>
                                                <dd className="inline">{item?.category}</dd>
                                            </div>

                                            <div>
                                                <dt className="inline">Price: </dt>
                                                <dd className="inline">{item?.price}$</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </li>
                            )
                        })}

                    </ul>

                    <div className="space-y-4 text-center">
                        <Link
                            to="/my-cart"
                            className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
                            onClick={() => setIsActive(false)}
                        >
                            View my cart ({cart.length})
                        </Link>

                        <Link
                            to="/"
                            className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
                            onClick={() => setIsActive(false)}
                        >
                            Continue shopping
                        </Link>
                    </div>
                </div>
            </div>}


        </div>

    )
}

export default Cart