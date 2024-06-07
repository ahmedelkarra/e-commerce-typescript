import { Request, Response, Router } from "express";
import userInfo, { SchemaUser } from "../models/schema";
import verify from "../middleware/verify";
import bcrypt from 'bcrypt'

const router = Router()


interface UserForm {
    _id?: string,
    username: string,
    email: string,
    fName: string,
    lName: string,
    pass: string,
    newPass?: string,
    newPassConfirm?: string,
}

router.put('/user/:id', verify, async (req: Request, res: Response) => {
    const id = req.params.id
    const { fName, lName, username, email, pass, newPass, newPassConfirm } = req.body as UserForm
    if (fName && lName && username && email && pass && newPass === newPassConfirm) {
        try {
            const user = await userInfo.findById({ _id: id }) as SchemaUser
            const passHash = bcrypt.compareSync(pass, user.pass)
            if (passHash && !newPass && !newPassConfirm) {
                const user = await userInfo.findByIdAndUpdate({ _id: id }, { fName, lName, username, email }) as SchemaUser
                if (user) {
                    return res.json({ message: 'User Has Been Updated' })
                } else {
                    return res.status(400).json({ message: 'Please Check Your Inputs' })
                }
            } else if (passHash && newPass === newPassConfirm) {
                const hashPass = bcrypt.hashSync(newPass || '', 10)
                const user = await userInfo.findByIdAndUpdate({ _id: id }, { fName, lName, username, email, pass: hashPass }) as SchemaUser
                if (user) {
                    return res.json({ message: 'User Has Been Updated' })
                } else {
                    return res.status(400).json({ message: 'Please Check Your Inputs' })
                }
            }
            else {
                return res.status(404).json({ message: 'Wrong Password' })
            }
        } catch (error) {
            return res.status(400).json({ message: 'Your Email Or UserName Already Used' })
        }
    }
})


router.delete('/user/:id', verify, (req: Request, res: Response) => {
    return res.json({ message: 'Welcome user' })
})

export default router