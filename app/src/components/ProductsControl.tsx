import { useContext } from "react"
import { GetProducts } from "../context/getProducts"
import DeleteProduct from "./DeleteProduct"
import { Link } from "react-router-dom";
import OneUserInfo from "../context/OneUserInfo";

function AdminProducts() {
    const oneUser = useContext(OneUserInfo)
    const ProductsContext = useContext(GetProducts);
    if (!oneUser) {
        throw new Error("GetProducts.Provider from Home Page");
    }
    if (!ProductsContext) {
        throw new Error("GetProducts.Provider from Home Page");
    }
    const { products } = ProductsContext;
    const { setOneUserInfo } = oneUser
    return (
        <div className="grid gap-4 rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12 h-[600px] overflow-auto">
            {
                products?.map((ele) => {
                    return (
                        <div className="grid grid-cols-3 md:grid-cols-2 border border-blue-300 rounded-lg" key={ele._id}>
                            <img src={ele.image} alt={ele.title} className="object-fill h-[100%] w-[100%] col-span-12 rounded-t-lg md:col-span-1" />
                            <div className="flex flex-col gap-2 items-center px-4 mt-2 col-span-12 md:col-span-1">
                                <h2 className="border border-blue-300 w-[100%] p-2 line-clamp-1 rounded-lg">{ele.title}</h2>
                                <p className="border border-blue-300 w-[100%] p-2 overflow-auto h-[200px] rounded-lg">{ele.body}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <h3 className="flex items-center justify-center border border-blue-600 bg-blue-500 text-white rounded-lg p-2 text-center">{ele.price}$</h3>
                                    {ele?.isActive && <h3 className="flex items-center justify-center border border-green-600 bg-green-500 text-white rounded-lg p-2 text-center">Active Product</h3>}
                                    {!ele?.isActive && <h3 className="flex items-center justify-center border border-red-600 bg-red-500 text-white rounded-lg p-2 text-center">Not Active product</h3>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-3">
                                    <Link to={`/admin/editproducts/${ele._id}`} onClick={() => setOneUserInfo(ele)} className="flex items-center justify-center border border-green-600 bg-green-500 text-white rounded-lg p-2 text-center">Edit Product</Link>
                                    <DeleteProduct item={ele} />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div >
    )
}

export default AdminProducts