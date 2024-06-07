import { Dispatch, SetStateAction, createContext } from "react";


export interface ProductsType {
    _id: string,
    title: string,
    body: string,
    price: number,
    isActive: boolean,
    image: string,
    category: string,
}

export const GetProducts = createContext<{
    products: ProductsType[],
    setProducts: Dispatch<SetStateAction<ProductsType[]>>
} | undefined>(undefined)
