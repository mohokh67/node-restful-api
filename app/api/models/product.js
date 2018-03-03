import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
})

module.exports = mongoose.model('Product', productSchema)
