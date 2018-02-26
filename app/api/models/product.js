import mongoose from 'mongoose'

mongoose.Promise = Promise; // Use the ES6 promise for mongoose promise

const productSchema = mongoose.Schema({
    name: String,
    price: Number
})

module.exports = mongoose.model('Product', productSchema)
