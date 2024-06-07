import { Request, Response, Router } from "express";
import isAdmin from "../middleware/isAdmin";
import Productes from "../models/products";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../image/'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1])
    },
})

const upload = multer({
    storage: storage, limits: { fileSize: 1024 * 1024 * 3 }, fileFilter(req, file, cb) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            return cb(new Error('Invalid file type'));
        }
    },
})

const router = Router()

interface Products {
    title: string,
    body: string,
    price: number,
    isActive: boolean,
    category: string,
}

router.get('/products/', async (req: Request, res: Response) => {
    const getAllProducts = await Productes.find()
    return res.json({ products: getAllProducts })
})


router.post('/products', isAdmin, upload.single('productsImage'), async (req, res) => {
    try {
        const hostName = req.get('host')
        const title = req.body.title;
        const body = req.body.body;
        const price = req.body.price;
        const isActive = req.body.isActive;
        const productsImage = req.file;
        const category = req.body.category

        if (!title || !body || !price || !productsImage) {
            throw new Error('All fields are required');
        }
        if (title && body && price && isActive && category) {
            try {
                await Productes.create({ title: title, body: body, price: price, isActive: isActive, image: `http://${hostName}/image/${productsImage!.filename}`, category: category })
                return res.json({ message: 'product has been created' })
            } catch (error) {
                return res.status(400).json({ message: 'You already have the same title product' })
            }
        } else {
            return res.status(400).json({ message: 'Plaese check your data' })
        }
    } catch (error) {
        res.status(400).json({ message: 'File Type Not Supported' });
    }
});


router.put('/products/:id', isAdmin, async (req: Request, res: Response) => {
    const id = req.params.id
    const { title, body, price, isActive, category } = <Products>req.body

    if (title && body && price && isActive && category) {
        try {
            const addProduct = await Productes.findByIdAndUpdate({ _id: id }, { title: title, body: body, price: price, isActive: isActive, category: category })
            return res.json({ message: 'product has been updated' })
        } catch (error) {
            return res.status(400).json({ message: error })
        }
    } else {
        return res.status(400).json({ message: 'Plaese check your data' })
    }
})

router.delete('/products/:id', isAdmin, async (req: Request, res: Response) => {
    const id = req.params.id

    if (id) {
        try {
            await Productes.findByIdAndDelete({ _id: id })
            return res.json({ message: 'product has been deleted' })
        } catch (error) {
            return res.status(400).json({ message: 'ID is not found' })
        }
    } else {
        return res.status(400).json({ message: 'please enter an ID' })
    }
})


export default router