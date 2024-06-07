import { Request, Response, Router } from "express";
import userInfo from "../models/schema";
import bcrypt from 'bcrypt'

const router = Router()


router.post('/signup', async (req: Request, res: Response) => {
    const { email, username, fName, lName, pass, confirmPass } = await req.body
    const checkEmail = email?.includes('@') && email?.includes('.')

    if (username && fName && lName && checkEmail && pass === confirmPass)
        try {
            const hashPass = bcrypt.hashSync(pass, 10)
            const addUser = await userInfo.create({ email: email.trim().toLowerCase(), username: username.trim().toLowerCase(), fName: fName.trim().toLowerCase(), lName: lName.trim().toLowerCase(), pass: hashPass.trim() })
            addUser.save()
            return res.json({ message: 'Account has been created' })
        } catch (error) {
            const addUser = await userInfo.findOne({ email: email })
            if (addUser?.username === username || addUser?.email === email) {
                return res.status(400).json({ message: 'username or email is already used' })
            } else {
                return res.status(400).json({ message: 'please check your data inputs' })
            }

        } else {
        return res.status(400).json({ message: 'please check your data inputs' })
    }
})


export default router