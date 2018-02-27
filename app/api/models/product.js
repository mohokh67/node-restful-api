import mongoose from 'mongoose'

mongoose.Promise = Promise; // Use the ES6 promise for mongoose promise

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
})

module.exports = mongoose.model('Product', productSchema)
