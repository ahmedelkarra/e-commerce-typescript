import mongoose from "mongoose";


interface Products {
    title: string,
    body: string,
    price: number,
    isActive: boolean,
    image: string,
    category: string
}


const products = new mongoose.Schema<Products>(
    {
        title: { type: String, unique: true, maxlength: 100 },
        body: { type: String, maxlength: 1000 },
        price: { type: Number, maxlength: 15 },
        isActive: { type: Boolean, default: true },
        image: { type: String, default: 'https://cdni.iconscout.com/illustration/premium/thumb/working-timeline-9427965-7702944.png?f=webp' },
        category: { type: String, maxlength: 150 },
    }
)

const Productes = mongoose.model('products', products)


export default Productes