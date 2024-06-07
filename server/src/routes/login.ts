import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import userInfo from '../models/schema'
import { config } from 'dotenv'
import verify from '../middleware/verify'

config()
const key: any = process.env.SECRET_KEY
const router = express.Router()


interface UserToken {
    _id: string,
    fName: string,
    lName: string,
    email: string,
    username: string,
    isAdmin: string
}

router.get('/login', verify, async (req, res) => {
    try {
        const token: string = req.headers.authorization || ''
        const checkUserInfo = jwt.verify(token, key) as UserToken
        const userToken = <UserToken>({ _id: checkUserInfo._id, fName: checkUserInfo.fName, lName: checkUserInfo.lName, email: checkUserInfo.email, username: checkUserInfo.username, isAdmin: checkUserInfo.isAdmin })
        const user = await userInfo.findById({ _id: userToken._id }).select('_id username fName lName email username isAdmin') as UserToken
        if (userInfo) {
            return res.json({ message: user })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error })
    }
})

router.post('/login', async (req: Request, res: Response) => {
    const { emailOrusername, pass } = req.body
    const checkEmail = emailOrusername?.includes('@') && emailOrusername?.includes('.')

    if (emailOrusername && pass) {
        try {
            if (checkEmail && pass) {
                const getInfo = await userInfo.findOne({ email: emailOrusername.toLowerCase().trim() })
                const getPass: string = getInfo!.pass
                const checkPass = bcrypt.compareSync(pass, getPass)
                if (checkPass) {
                    const token = jwt.sign({ _id: getInfo?._id, fName: getInfo!.fName, lName: getInfo!.lName, email: getInfo!.email, username: getInfo!.username, isAdmin: getInfo!.isAdmin }, key, { algorithm: 'HS256', expiresIn: '4h' })
                    return res.json({ message: getInfo!.fName + " " + getInfo!.lName, token: token })
                } else {
                    return res.status(400).json({ message: 'please check your data' })
                }
            } else if (emailOrusername && pass) {
                const getInfo = await userInfo.findOne({ username: emailOrusername.toLowerCase().trim() })
                const getPass: string = getInfo!.pass
                const checkPass = bcrypt.compareSync(pass, getPass)
                if (checkPass) {
                    const key: any = process.env.SECRET_KEY
                    const token = jwt.sign({ _id: getInfo?._id, fName: getInfo!.fName, lName: getInfo!.lName, email: getInfo!.email, username: getInfo!.username, isAdmin: getInfo!.isAdmin }, key, { algorithm: 'HS256', expiresIn: '4h' })
                    return res.json({ message: getInfo!.fName + " " + getInfo!.lName, token: token })
                } else {
                    return res.status(400).json({ message: 'please check your data' })
                }
            }
        } catch (error) {
            return res.status(400).json({ message: 'please check your data' })
        }
    } else {
        return res.status(400).json({ message: 'please check your data' })
    }
})


export default router