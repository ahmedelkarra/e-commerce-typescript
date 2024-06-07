import { useContext, useEffect, useState } from "react"
import { ProductsType } from "../context/getProducts"
import IsChange from "../context/isChange"
import { Link, useNavigate } from "react-router-dom"
import axiosMain from "../services/axios"



function EditProduct({ item }: { item: ProductsType }) {
    const navigate = useNavigate()
    const [value, setValue] = useState<ProductsType>({ _id: item?._id, body: item?.body, image: item?.image, isActive: item?.isActive, price: item?.price, title: item?.title, category: '' })
    const [errorText, setErrorText] = useState('')
    const [successText, setSuccessText] = useState('')
    const context = useContext(IsChange)

    if (!context) {
        throw new Error('this must be only boolean value')
    }
    const { setIsChange } = context

    const redirectUser = () => {
        navigate('/admin/editproducts')
    }

    const editProductHandel = () => {
        if (value.body && value.isActive && value.price && value.title) {
            axiosMain.put(`/products/${value._id}`, { title: value.title, body: value.body, price: value.price, isActive: value.isActive, category: value.category })
                .then((e) => {
                    setSuccessText(e?.data?.message)
                    setTimeout(() => {
                        redirectUser()
                        setErrorText('')
                        setSuccessText('')
                        setIsChange(true)
                    }, 1500)
                })
                .catch((err) => {
                    setErrorText(err?.response?.data?.message)
                })
        } else {
            setErrorText('Please Check Your Inputs')
        }
    }

    useEffect(() => {
        if (!value._id) {
            redirectUser()
        }
    }, [])
    return value._id && (
        <div className="grid grid-cols-12 gap-2 items-center justify-center rounded-lg bg-white shadow-lg lg:col-span-3 lg:p-12 h-[650px] overflow-auto p-5">
            {errorText && <h2 className="col-span-12 rounded border-s-4 border-red-500 bg-red-50 p-4 mb-2">{errorText}</h2>}
            {successText && <h2 className="col-span-12 rounded border-s-4 border-green-500 bg-green-50 p-4 mb-2">{successText}</h2>}
            <div className="col-span-12 grid grid-cols-12 items-center gap-3">
                <label htmlFor="title" className="col-span-2">Title:</label>
                <input className="col-span-10 border border-blue-300 rounded-lg p-2" id="title" placeholder="Enter Title" type="text" value={value.title} onChange={(e) => setValue({ ...value, title: e.target.value })} />
            </div>
            <div className="col-span-12 grid grid-cols-12 items-center gap-3">
                <label htmlFor="price" className="col-span-2">Price:</label>
                <input className="col-span-10 border border-blue-300 rounded-lg p-2" id="price" placeholder="Enter Price" type="number" value={value.price} onChange={(e) => setValue({ ...value, price: parseInt(e.target.value) })} />
            </div>
            <div className="col-span-12 grid grid-cols-12 items-center gap-3">
                <label htmlFor="body" className="col-span-2">Des:</label>
                <textarea className="h-[200px] col-span-10 border border-blue-300 rounded-lg p-2 resize-none" placeholder="Enter Description" name="" id="body" value={value.body} onChange={(e) => setValue({ ...value, body: e.target.value })}></textarea>
            </div>
            <div className="col-span-12 grid grid-cols-12 gap-4 text-center">
                <div className="col-span-6">
                    <label
                        htmlFor="Option1"
                        className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-green-300 has-[:checked]:border-green-600 has-[:checked]:bg-green-500 has-[:checked]:text-white"
                        tabIndex={0}
                    >
                        <input className="sr-only" id="Option1" type="radio" tabIndex={-1} name="option" onChange={() => setValue({ ...value, isActive: true })} />

                        <span className="text-sm"> Active Product</span>
                    </label>
                </div>

                <div className="col-span-6">
                    <label
                        htmlFor="Option2"
                        className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-red-300 has-[:checked]:border-red-600 has-[:checked]:bg-red-500 has-[:checked]:text-white"
                        tabIndex={0}
                    >
                        <input className="sr-only" id="Option2" type="radio" tabIndex={-1} name="option" onChange={() => setValue({ ...value, isActive: false })} />

                        <span className="text-sm"> Not Active Product </span>
                    </label>
                </div>

            </div>

            <select name="" id="" onChange={(e) => setValue({ ...value, category: e.target.value })} className='col-span-12 w-full border rounded-lg p-2'>
                <option hidden>Category</option>
                <option value="mobile">Mobile</option>
                <option value="laptop">Laptop</option>
                <option value="tv">TV</option>
                <option value="others">Others</option>
            </select>

            <div className="col-span-12 grid grid-cols-12 gap-4 justify-evenly items-center ">
                <button className="col-span-6 text-center cursor-pointer rounded-lg border border-gray-200 p-3 bg-yellow-400 text-white" onClick={editProductHandel}>Edit</button>
                <Link to={'/admin/editproducts'} className="col-span-6 text-center cursor-pointer rounded-lg border border-gray-200 p-3 bg-red-500 text-white">Cancel</Link>
            </div>
        </div>
    )
}

export default EditProduct
