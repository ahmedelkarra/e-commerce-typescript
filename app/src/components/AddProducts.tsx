import { useContext, useState } from 'react'
import axiosMain from '../services/axios';
import IsChange from '../context/isChange';

interface Form {
    title: string,
    body: string,
    price: number,
    isActive: boolean,
    image: string,
    category: string
}

function AddProducts() {
    const [form, setForm] = useState<Form>({ title: '', body: '', price: 0, isActive: false, image: '', category: '' })
    const [errorText, setErrorText] = useState('')
    const [successText, setSuccessText] = useState('')
    const [image, setImage] = useState('')
    const context = useContext(IsChange)
    if (!context) {
        throw new Error('this must be only boolean value')
    }

    const { setIsChange } = context

    const imageHandle = (e: any) => {
        setImage(e.target.files[0])
    }
    const fromHandel = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (form.title && form.body && form.price && form.category) {
            const formData = new FormData()
            formData.append('productsImage', image);
            formData.append('title', form.title);
            formData.append('body', form.body);
            formData.append('isActive', form.isActive.toString());
            formData.append('price', form.price.toString());
            formData.append('category', form.category)

            axiosMain.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((e) => {
                    setSuccessText(e?.data?.message)
                    setIsChange(true)
                    setForm({ title: '', body: '', price: 0, isActive: false, image: '', category: '' })
                    setTimeout(() => {
                        setErrorText('')
                        setSuccessText('')
                    }, 1500)
                })
                .catch((err) => {
                    setErrorText(err?.response?.data?.message)
                    setTimeout(() => {
                        setErrorText('')
                        setSuccessText('')
                    }, 2000)
                })
        }
    }

    return (
        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            {errorText && <h2 className="rounded border-s-4 border-red-500 bg-red-50 p-4 mb-2">{errorText}</h2>}
            {successText && <h2 className="rounded border-s-4 border-green-500 bg-green-50 p-4 mb-2">{successText}</h2>}
            <form onSubmit={(e) => fromHandel(e)} className="space-y-4">
                <div>
                    <label className="sr-only" htmlFor="Title">Title</label>
                    <input
                        className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                        placeholder="Title"
                        type="text"
                        id="Title"
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        value={form.title}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 ">

                    <div>
                        <label className="sr-only" htmlFor="price">Price</label>
                        <input
                            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                            placeholder="Price"
                            type="number"
                            id="price"
                            onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
                            value={form.price}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="Option1"
                            className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-green-300 has-[:checked]:border-green-600 has-[:checked]:bg-green-500 has-[:checked]:text-white"
                            tabIndex={0}
                        >
                            <input className="sr-only" id="Option1" type="radio" tabIndex={-1} name="option" onChange={() => setForm({ ...form, isActive: true })} />

                            <span className="text-sm"> Active Product</span>
                        </label>
                    </div>

                    <div>
                        <label
                            htmlFor="Option2"
                            className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-red-300 has-[:checked]:border-red-600 has-[:checked]:bg-red-500 has-[:checked]:text-white"
                            tabIndex={0}
                        >
                            <input className="sr-only" id="Option2" type="radio" tabIndex={-1} name="option" onChange={() => setForm({ ...form, isActive: false })} />

                            <span className="text-sm"> Not Active Product </span>
                        </label>
                    </div>

                </div>

                <div>
                    <label className="sr-only" htmlFor="body">Body</label>

                    <textarea
                        className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                        placeholder="Body"
                        rows={8}
                        id="body"
                        onChange={(e) => setForm({ ...form, body: e.target.value })}
                        value={form.body}
                    ></textarea>
                </div>

                <select name="" id="" onChange={(e) => setForm({ ...form, category: e.target.value })} className='w-full border rounded-lg p-2'>
                    <option hidden>Category</option>
                    <option value="mobile">Mobile</option>
                    <option value="laptop">Laptop</option>
                    <option value="tv">TV</option>
                    <option value="others">Others</option>
                </select>


                <div className="grid grid-cols-1 gap-4 ">

                    <div>
                        <label className="sr-only" htmlFor="price">Price</label>
                        <input
                            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                            placeholder="Price"
                            type="file"
                            id="price"
                            onChange={(e) => imageHandle(e)}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="inline-block w-full rounded-lg bg-buttonColor px-5 py-3 font-medium text-buttonText sm:w-auto"
                    >
                        Add Product To Sell
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddProducts