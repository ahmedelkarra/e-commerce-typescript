import { Dispatch, SetStateAction, createContext } from "react";
import { ProductsType } from "./getProducts";





const CartContext = createContext<{
    cart: ProductsType[],
    setCart: Dispatch<SetStateAction<ProductsType[]>>
} | undefined>(undefined)



export default CartContext