import mongoose from "mongoose";


export interface SchemaUser {
    username: string,
    email: string,
    fName: string,
    lName: string,
    pass: string,
    isAdmin: boolean
}

const schemaUser = new mongoose.Schema<SchemaUser>(
    {
        username: { type: String, unique: true, maxlength: 50, required: true },
        email: { type: String, unique: true, maxlength: 50, required: true },
        fName: { type: String, maxlength: 30, required: true },
        lName: { type: String, maxlength: 30, required: true },
        pass: { type: String, maxlength: 100, required: true },
        isAdmin: { type: Boolean, default: false }
    }
)

const userInfo = mongoose.model('user', schemaUser)

export default userInfo