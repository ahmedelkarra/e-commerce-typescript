import { useContext } from "react"
import { ProductsType } from "../context/getProducts"
import IsChange from "../context/isChange"
import axiosMain from "../services/axios"




function DeleteProduct({ item }: { item: ProductsType }) {
    const context = useContext(IsChange)

    if (!context) {
        throw new Error('this must be only boolean value')
    }
    const { setIsChange } = context

    const deleteProductHandel = () => {
        const answer = window.confirm(`Are You Sure That You Want To Delete ${item.title}`)
        if (answer === true) {
            axiosMain.delete(`/products/${item?._id}`)
                .then(() => {
                    setIsChange(true)
                })
                .catch((err) => {
                    console.log(err?.response?.data?.message)
                })
        }
    }

    return (
        <button className="bg-red-500 text-white p-2 rounded-lg" onClick={deleteProductHandel}>Delete Product</button>
    )
}

export default DeleteProduct