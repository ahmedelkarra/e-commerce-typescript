import { config } from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import isAdmin from './isAdmin'

config()

interface Info {
    isAdmin: boolean,
}

const verify = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    const key: any = process.env.SECRET_KEY
    try {
        if (token) {
            const ckeckToken = <Info>jwt.verify(token, key)
            if (ckeckToken) {
                if (ckeckToken!.isAdmin === true) {
                    return isAdmin(req, res, next)
                } else {
                    console.log('verify page');
                    return next()
                }
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

export default verify