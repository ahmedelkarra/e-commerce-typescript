import { config } from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

config()

interface Info {
    isAdmin: string,
}


const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    const key: any = process.env.SECRET_KEY
    try {
        if (token) {
            const ckeckToken = <Info>jwt.verify(token, key)
            if (ckeckToken!.isAdmin) {
                console.log('this one is admin');
                next()
            } else {
                return res.status(401).json({ message: 'unauthorized' })
            }
        } else {
            return res.status(401).json({ message: 'unauthorized' })
        }
    } catch (error) {
        return res.status(401).json({ message: 'unauthorized' })
    }
}


export default isAdmin