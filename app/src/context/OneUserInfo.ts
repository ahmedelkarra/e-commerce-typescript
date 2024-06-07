import { Dispatch, SetStateAction, createContext } from "react";



export interface OneUserType {
    _id: string,
    title: string,
    body: string,
    price: number,
    isActive: boolean,
    image: string,
    category: string
}

const OneUserInfo = createContext<{
    oneUserInfo: OneUserType,
    setOneUserInfo: Dispatch<SetStateAction<OneUserType>>
} | undefined>(undefined)


export default OneUserInfo