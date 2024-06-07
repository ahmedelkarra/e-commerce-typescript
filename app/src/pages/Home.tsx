import { useContext } from "react"
import Products from "../components/products"
import { GetProducts } from "../context/getProducts"
import HeroSection from "../components/HeroSection";




function Home() {
    const context = useContext(GetProducts);
    if (!context) {
        throw new Error("GetProducts.Provider from Home Page");
    }
    const { products } = context;

    return (
        <div>
            <HeroSection />
            <div className="grid grid-cols-12 gap-x-10 m-auto items-center justify-center mx-7">
                {products.map((ele) => {
                    return (
                        <Products products={ele} key={ele._id} />
                    )
                })}
            </div>
        </div>
    )
}

export default Home