import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'
import Admin from './pages/Admin'
import Footer from './components/Footer'
import Home from './pages/Home'
import { useEffect, useState } from 'react'
import axiosMain from './services/axios'
import { GetProducts, ProductsType } from './context/getProducts'
import GetUser, { UserType } from './context/getUser'
import IsChange from './context/isChange'
import AddProducts from './components/AddProducts'
import ProductsControl from './components/ProductsControl'
import EditProduct from './components/EditProduct'
import OneUserInfo, { OneUserType } from './context/OneUserInfo'
import MyCart from './pages/MyCart'
import SelectedProduct from './pages/SelectedProduct'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import ProfileInfo from './components/ProfileInfo'
import ProfileEdit from './components/ProfileEdit'
import CartContext from './context/cartContext'


function App() {
    const storedCart = localStorage.getItem('cart')
    const cartInfo = storedCart ? JSON.parse(storedCart) : []
    const [userInfo, setUserInfo] = useState<UserType>({ username: '', email: '', fName: '', lName: '', isAdmin: false, _id: '' })
    const [oneUserInfo, setOneUserInfo] = useState<OneUserType>({ _id: '', title: '', body: '', image: '', price: 0, isActive: false, category: '' })
    const [products, setProducts] = useState<ProductsType[]>([])
    const [isChange, setIsChange] = useState<boolean>(false)
    const [cart, setCart] = useState<ProductsType[]>(cartInfo)

    const getAllProducts = () => {
        axiosMain.get('/products')
            .then((ele) => {
                const products = ele?.data?.products;
                if (products) {
                    setProducts(products);
                } else {
                    console.error('No products found in response');
                }
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }

    const getUser = () => {
        axiosMain.get('/login', { headers: { Authorization: localStorage.getItem('token') || '' } })
            .then((ele) => {
                const userInfo = ele?.data?.message;
                setUserInfo(userInfo);
            })
            .catch((error) => {
                setUserInfo({ username: '', email: '', fName: '', lName: '', isAdmin: false, _id: '' })
                localStorage.removeItem('token')
                console.error("ERROR " + error.response.data.message);
            });
    }
    useEffect(() => {
        getAllProducts()
        getUser()
        setIsChange(false)
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [isChange, cart])
    return (
        <BrowserRouter>
            <div className='flex flex-col justify-between min-h-[100vh]'>
                <GetProducts.Provider value={{ products, setProducts }}>
                    <GetUser.Provider value={{ userInfo, setUserInfo }}>
                        <IsChange.Provider value={{ isChange, setIsChange }}>
                            <OneUserInfo.Provider value={{ oneUserInfo, setOneUserInfo }}>
                                <CartContext.Provider value={{ cart, setCart }}>
                                    <Header />
                                    <Routes>
                                        <Route path='/' element={<Home />} />
                                        {!userInfo?.email && <Route path='login' element={<Login />} />}
                                        {!userInfo?.email && <Route path='signup' element={<Signup />} />}
                                        <Route path='/about' element={<About />} />
                                        <Route path='/my-cart' element={<MyCart />} />
                                        {userInfo?.isAdmin && <Route path='admin' element={<Admin />} >
                                            <Route path='addproduct' element={<AddProducts />} />
                                            <Route path='editproducts' element={<ProductsControl />} />
                                            <Route path='editproducts/:id' element={<EditProduct item={oneUserInfo} />} />
                                        </Route>}
                                        <Route path='/product/:id' element={<SelectedProduct item={products} />} />
                                        <Route path='/profile/' element={<Profile user={userInfo} />}>
                                            <Route path='/profile/:id' element={<ProfileInfo user={userInfo} />} />
                                            <Route path='/profile/edit/:id' element={<ProfileEdit user={userInfo} />} />
                                        </Route>
                                        <Route path='*' element={<NotFound />} />
                                    </Routes>
                                    <Footer />
                                </CartContext.Provider>
                            </OneUserInfo.Provider>
                        </IsChange.Provider>
                    </GetUser.Provider>
                </GetProducts.Provider>
            </div>
        </BrowserRouter>
    )
}

export default App
