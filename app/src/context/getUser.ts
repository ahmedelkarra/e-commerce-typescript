import { Dispatch, SetStateAction, createContext } from "react";



export interface UserType {
    _id: string,
    username: string,
    email: string,
    fName: string,
    lName: string,
    isAdmin: boolean,
}



const GetUser = createContext<{
    userInfo: UserType,
    setUserInfo: Dispatch<SetStateAction<UserType>>
} | undefined>(undefined)



export default GetUser