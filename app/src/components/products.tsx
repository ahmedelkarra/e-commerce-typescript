import { Link } from "react-router-dom";
import { ProductsType } from "../context/getProducts";
import { useContext } from "react";
import CartContext from "../context/cartContext";


function Products({ products }: { products: ProductsType }) {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('this must be as ProductsType')
    }
    const { cart, setCart } = context

    const cartHnadel = (item: ProductsType) => {
        setCart([...cart, item])
    }
    return products.isActive && (
        <div className="col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-3 mx-auto my-5 group relative overflow-hidden rounded-lg w-72">
            <Link to={`/product/${products._id}`}>
                <img
                    src={products.image}
                    alt={products.title}
                    className="h-64 w-full object-fill transition duration-500 group-hover:scale-105 sm:h-72"
                />
            </Link>
            <div className="relative border border-gray-100 bg-white p-6">
                <span className="whitespace-nowrap bg-sky-200 px-3 py-1.5 text-xs font-medium"> New </span>

                <h3 className="mt-4 text-lg font-medium text-gray-900">{products.title}</h3>

                <p className="mt-1.5 text-sm text-gray-700">{products.price}$</p>

                <button
                    onClick={() => cartHnadel(products)}
                    className="block w-full rounded bg-buttonColor text-center text-buttonText p-4 text-sm font-medium transition hover:scale-105"
                >
                    Add to Cart
                </button>
            </div>
        </div>

    )
}

export default Products